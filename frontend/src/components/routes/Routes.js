import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import PrivateRoute from './PrivateRoute'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'
import GroupScreen from '../../screens/GroupScreen'

const Routes = () => {
  return (
    <section className='mx-auto'>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/forgotpassword' component={ForgotPasswordScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' r component={RegisterScreen} />

        <PrivateRoute
          role={['admin', 'user']}
          path='/profile'
          component={ProfileScreen}
        />

        <Route
          path='/resetpassword/:resetToken'
          component={ResetPasswordScreen}
        />
        <PrivateRoute
          path='/admin/users/logs'
          role={['admin']}
          component={UserLogHistoryScreen}
        />
        <PrivateRoute
          exact
          path='/admin/users'
          role={['admin']}
          component={UserListScreen}
        />
        <PrivateRoute
          exact
          path='/admin/users/groups'
          role={['admin']}
          component={GroupScreen}
        />
        <PrivateRoute
          path='/admin/users/page/:pageNumber'
          role={['admin']}
          component={UserListScreen}
        />

        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
