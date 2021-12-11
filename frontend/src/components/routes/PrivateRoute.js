import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { UnlockAccessRoute } from '../UnlockAccess'

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const userInfo =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo'))

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Navigate to='/login' />
        ) : userInfo && !UnlockAccessRoute(role, userInfo) ? (
          <Navigate to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
