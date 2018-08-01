import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DeleteRecord from '../DataTable/Action/DeleteRecord'
import * as Session from '../../Lib/Helpers/Session'
import DELETE_CLASS from '../../Config/Admin/Classes/DeleteClass'

export default class DeleteClass extends Component {
  constructor() {
    super()

    this.state = { redirectToClasses: false }
  }

  handleRedirectToUsers() {
    setTimeout(() => {
      this.setState({ redirectToClasses: true })
    }, 300)
  }

  render() {
    if (!Session.isAuthorised('/admin/classes/delete'))
      return null

    if (this.state.redirectToClasses)
      return <Redirect to="/admin/classes" />

    const props = this.props

    return (
      <DeleteRecord
        isButton
        dataSource={process.env.REACT_APP_API_CLASSES_URL}
        showDeleteRecord={true}
        resource={props.resource}
        disabled={props.disabled}
        onSuccess={this.handleRedirectToUsers.bind(this)}
        resourceIdKey="classId"
        confirmModal={DELETE_CLASS}
        successMessage="User has been successfully deleted."
      />
    )
  }
}
