import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminClassForm from '../../../Components/Forms/Admin/Class'

export default class Edit extends Component {
  render() {
    return (
      <div className="users-form-edit">
        <PageTitle title="Edit User" appName="Admin" />
        <div className="form-wrapper -default">
          <AdminClassForm {...this.props} />
        </div>
      </div>
    )
  }
}
