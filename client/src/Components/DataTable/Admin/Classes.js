import React, { Component } from 'react'
import DataTable from '../DataTable'
import { isAuthorised } from '../../../Lib/Helpers/Session'
import AdminClassForm from '../../Forms/Admin/Class'
// import AdminUserStatic from '../../Forms/Static/Admin/User'
import Config from '../../../Config/Admin/Classes/DataTable'
import DELETE_CLASS from '../../../Config/Admin/Classes/DeleteClass'

const NEW_FORM_OPTION = {
  title: 'New Class',
  component: AdminClassForm
}
const EDIT_FORM_OPTION = {
  title: 'Edit Class',
  component: AdminClassForm
}
// const VIEW_RECORD_OPTION = {
//   title: 'User',
//   component: AdminUserStatic
// }

export default class Classes extends Component {
  render() {
    const props = this.props

    return (
      <DataTable
        {...Config}
        dataSource={process.env.REACT_APP_API_CLASSES_URL}
        path={props.path}
        dataTableState={props.AdminClasses}
        saveQueryState={props.saveQuery}
        showNewForm={isAuthorised('/admin/users/new')}
        // showViewRecord={isAuthorised('/admin/users/:userId')}
        showEditRecord={isAuthorised('/admin/users/:userId/edit')}
        showDeleteRecord={isAuthorised('/admin/users/delete')}
        resourceIdKey="classId"
        newFormOption={NEW_FORM_OPTION}
        editFormOption={EDIT_FORM_OPTION}
        // viewRecordOption={VIEW_RECORD_OPTION}
        confirmModal={DELETE_CLASS}
      />
    )
  }
}
