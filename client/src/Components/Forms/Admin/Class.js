import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'
import Axios from '../../../Lib/Common/Axios'
import Form from 'react-jsonschema-form'
import { Button } from 'react-bootstrap'
import Alert from '../../Alert'
import * as FormHelper from '../../../Lib/Helpers/Form'
import Config from '../../../Config/Admin/Classes/Form'
import DeleteUserButton from '../../Buttons/DeleteClass'
import * as Session from '../../../Lib/Helpers/Session'

export default class Class extends Component {
  constructor(props) {
    super(props)

    const resource = props.resource
    const formData = resource ? resource : Config.initData
    const schema = setSchema(formData)

    this.state = {
      key: Math.random(),
      formData,
      resource,
      schema,
      loading: '',
      buttonDisabled: false,
      resourceId: null,
      method: 'post',
      axiosCancelToken: null,
      processRequest: false,
      payloadRequestError: false,
      getRequestError: false,
      successMessage: null,
      errorMessage: null
    }
  }

  handleSubmitForm() {
    document.getElementById('jsSubmitForm').click()
  }

  handleOnChange({ formData }) {
    const state = this.state
    const buttonDisabled = formDataString(formData) === formDataString(state.resource)
    this.setState({
      formData,
      schema: setSchema(formData),
      buttonDisabled,
      successMessage: null
    })
  }

  handleGetRequest() {
    if (!Session.decodedToken()) return Session.verifyToken()

    const _this = this
    const apiURL = [process.env.REACT_APP_API_CLASSES_URL, this.state.resourceId].join('/')
    const CancelToken = axios.CancelToken
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }

    Axios
      .get(apiURL, cancelTokenCallback)
      .then(({ data }) => {
        this.setState({
          formData: data,
          resource: data,
          schema: setSchema(data),
          loading: ''
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return true

        console.log('Error: ', error)

        this.setState({ getRequestError: true })
      })
  }

  handleOnSubmit({ formData }) {

    this.setState({
      key: Math.random(),
      formData,
      resource: formData,
      buttonDisabled: true,
      processRequest: true,
      payloadRequestError: false,
      getRequestError: false,
      successMessage: null,
      errorMessage: null
    })

    this.handlePayloadRequest(formData)
  }

  handlePayloadRequest(data) {
    if (!Session.decodedToken()) return Session.verifyToken()

    const resourceId = this.state.resourceId
    const method = this.state.method
    const CancelToken = axios.CancelToken
    const _this = this
    const cancelTokenCallback = {
      cancelToken: new CancelToken(function executor(cancel) {
        _this.setState({ axiosCancelToken: cancel })
      })
    }
    let url = process.env.REACT_APP_API_CLASSES_URL

    if (resourceId) url = [process.env.REACT_APP_API_CLASSES_URL, resourceId].join('/')



    Axios({ method, url, data, cancelTokenCallback })
      .then(response => {
        const processRequest = false
        const successMessage = [
          'Class has been',
          method === 'put' ? 'saved.' : 'created.'
        ].join(' ')

        data['classId'] = response.data.classId || resourceId

        this.setState({
          formData: data,
          resourceId: data.classId,
          method,
          processRequest,
          successMessage,
          buttonDisabled: true,
          errorMessage: null
        })
      })
      .catch(error => {
        if (axios.isCancel(error)) return true

        let message = null

        if (error.response && error.response.data.message)
          message = error.response.data.message

        console.log('Error: ', error)

        this.setState({
          buttonDisabled: false,
          processRequest: false,
          payloadRequestError: true,
          errorMessage: message
        })
      })
  }

  componentWillReceiveProps() {
    const props = this.props
    const state = this.state

    if (state.successMessage && props.showModal && props.onSuccess) {
      if (state.method === 'put') return props.onSuccess()

      const dataTableState = {
        page: 0,
        sorted: { classId: 'desc'}
      }

      setTimeout(() => props.onSuccess(dataTableState))
    }
  }

  componentWillUnmount() {
    if (typeof(this.state.axiosCancelToken) === 'function')
      this.state.axiosCancelToken()
  }

  componentDidMount() {
    const props = this.props

    if (props.resource) {
      return this.setState({
        formData: props.resource,
        resourceId: props.resource.classId,
        buttonDisabled: true,
        method: 'put'
      })
    }

    if (!props.computedMatch) return

    const resourceId = props.computedMatch.params.classId

    this.setState({
      loading: '-loading',
      buttonDisabled: true,
      resourceId,
      method: 'put'
    })

    setTimeout(() => {
      this.handleGetRequest()
    })
  }

  render() {
    let props = _.clone(this.props)
    const state = this.state

    props['handleSubmitForm'] = this.handleSubmitForm.bind(this)
    props['buttonDisabled'] = state.buttonDisabled

    return (
      <ContentWrapper {...props} key={state.key} resourceId={state.resourceId}>
        <FormMessage {...state} />
        {!state.getRequestError &&
          <Form
            formData={state.formData}
            schema={state.schema}
            uiSchema={Config.uiSchema}
            validate={validateForm}
            ErrorList={FormHelper.errorList}
            showErrorList={true}
            onChange={this.handleOnChange.bind(this)}
            onSubmit={this.handleOnSubmit.bind(this)}
            autocomplete="off"
            className={['form form-admin-user', state.loading].join(' ')}
          >
            <div className={props.isModal ? 'hide' : 'form-buttons'}>
              {state.resourceId &&
                <Link
                  to={['/admin/classes', state.resourceId].join('/')}
                  className="btn btn-default"
                >
                  Cancel
                </Link>
              }
              {state.resourceId &&
                <DeleteUserButton resource={state.formData} />
              }
              <Button
                id="jsSubmitForm"
                type="submit"
                bsStyle="success"
                disabled={state.buttonDisabled}
              >
                Save Class
              </Button>
            </div>
          </Form>
        }
      </ContentWrapper>
    )
  }
}

const ContentWrapper = (props) => {
  if (props.isModal)
    return (
      <div>
        <div className={['modal-body', '-form-content', props.className].join(' ')}>
          {props.children}
        </div>
        <div className="modal-footer">
          <Button onClick={props.toggleModalHandler}>Close</Button>
          {!props.resource && props.resourceId &&
            <Link
              to={['/admin/classes', props.resourceId, 'edit'].join('/')}
              className="btn btn-success"
            >
              Edit Class
            </Link>
          }
          {(props.resource || !props.resourceId) &&
            <Button
              bsStyle="success"
              onClick={props.handleSubmitForm}
              disabled={props.buttonDisabled}
            >
              Save Class
            </Button>
          }
        </div>
      </div>
    )

  return (
    <div>
      {props.children}
    </div>
  )
}

const FormMessage = (state) => {
  const showProcessError = state.getRequestError || state.payloadRequestError
  const errorMessage = state.payloadRequestError ? state.errorMessage : 'Class is not found or has been deleted.'

  return (
    <div className="form-message">
      {state.processRequest && <Alert processRequest />}
      {showProcessError && <Alert processError>{errorMessage}</Alert>}
      {state.successMessage && <Alert type="success" hideDismissButton>{state.successMessage}</Alert>}
    </div>
  )
}

function formDataString(data) {
  if (!data) return

  return JSON.stringify({
    title: data.title,
    slots: data.slots,
    description: data.description,
    activationCode: data.activationCode,
  })
}

function setSchema(data) {
  let schema = _.clone(Config.schema)

  return schema
}

function validateForm({ title, slots, description, activationCode }, errors) {
  if (title === '') errors.title.addError('Input title')
  if (slots === '') errors.slots.addError('Input slots')
  if (description === '') errors.description.addError('Input description')
  if (activationCode === '') errors.activationCode.addError('Input activationCode')

  return errors
}
