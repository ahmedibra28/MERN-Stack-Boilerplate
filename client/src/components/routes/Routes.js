import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../auth/Login";
import ChangePassword from "../auth/ChangePassword";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";

import PrivateRoute from "../routes/PrivateRoute";
import AdminPrivateRoute from "../routes/AdminPrivateRoute";

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route path='/login' component={Login} />
        <AdminPrivateRoute path='/register' component={Register} />
        <PrivateRoute path='/change-password' component={ChangePassword} />
        <PrivateRoute exact path='/' component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
