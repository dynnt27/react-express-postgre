import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminClassForm from '../../../Components/Forms/Admin/Class'

export default class New extends Component {
  render() {
    return (
      <div className="users-form-new">
        <PageTitle title="New User" appName="Admin" />
        <div className="form-wrapper -default">
          <AdminClassForm />
        </div>
      </div>
    )
  }
}
