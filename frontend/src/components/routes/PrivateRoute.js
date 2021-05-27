import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UnlockAccess } from '../UnlockAccess'

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const userInfo =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo'))

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Redirect to='/login' />
        ) : userInfo && !UnlockAccess(role, userInfo) ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
