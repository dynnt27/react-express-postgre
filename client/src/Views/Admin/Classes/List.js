import React, { Component } from 'react'
import { PageTitle } from '../../../Lib/Common/Views'
import AdminClassesDataTable from '../../../Redux/Containers/Admin/Classes'

export default class List extends Component {
  render() {
    return (
      <div className="users-view">
        <PageTitle title="Classes" appName="Admin" />
        <AdminClassesDataTable {...this.props} />
      </div>
    )
  }
}
