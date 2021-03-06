import React, { Component } from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Site from '../Views/Site'
import Admin from '../Views/Admin'
import { SiteRoute, AuthSiteRoute, AdminRoute } from '../Lib/Common/Routes'

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <SiteRoute exact path="/" component={Site.Home} />
          <SiteRoute exact path="/redux" component={Site.Redux} />
          <SiteRoute exact path="/sign-in" component={Site.SignIn} />
          <AuthSiteRoute exact path="/my-profile" component={Site.MyProfile} />

          <AdminRoute exact path="/admin" component={() => <Redirect to="/admin/dashboard" />} />
          <AdminRoute exact path="/admin/dashboard" component={Admin.Dashboard} />
          <AdminRoute exact path="/admin/sessions" component={Admin.Sessions.List} />
          <AdminRoute exact path="/admin/users" component={Admin.Users.List} />
          <AdminRoute exact path="/admin/users/new" component={Admin.Users.New} />
          <AdminRoute exact path="/admin/users/:userId" component={Admin.Users.Static} />
          <AdminRoute exact path="/admin/users/:userId/edit" component={Admin.Users.Edit} />

          <AdminRoute exact path="/admin/classes" component={Admin.Classes.List} />
          <AdminRoute exact path="/admin/classes/new" component={Admin.Classes.New} />
          <AdminRoute exact path="/admin/classes/:classId/edit" component={Admin.Classes.Edit} />

          <AdminRoute exact path="/admin/settings" component={Admin.Settings} />
          <AdminRoute path="/admin/*" component={Admin.PageNotFound} />

          <SiteRoute path="*" component={Site.PageNotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
