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
import RouteScreen from '../../screens/RouteScreen'

import { useQuery } from 'react-query'
import { getGroups } from '../../api/groups'

const Routes = () => {
  const { data: groupData, isLoading } = useQuery('groups', () => getGroups(), {
    retry: 0,
  })

  let group = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).group
    : null

  const switchRoutes = (component) => {
    switch (component) {
      case 'ProfileScreen':
        return ProfileScreen
      case 'UserListScreen':
        return UserListScreen
      case 'UserLogHistoryScreen':
        return UserLogHistoryScreen
      case 'GroupScreen':
        return GroupScreen
      case 'RouteScreen':
        return RouteScreen
      default:
        return NotFound
    }
  }

  return (
    <section className='mx-auto'>
      {isLoading ? (
        'Loading...'
      ) : (
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/forgot' component={ForgotPasswordScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/reset/:resetToken' component={ResetPasswordScreen} />

          {groupData &&
            groupData.map(
              (route) =>
                route.name === group &&
                route.isActive &&
                route.route.map((r) => (
                  <PrivateRoute
                    exact
                    path={r.path}
                    component={switchRoutes(r.component)}
                    role={[route.name]}
                  />
                ))
            )}

          <Route component={NotFound} />
        </Switch>
      )}
    </section>
  )
}

export default Routes
