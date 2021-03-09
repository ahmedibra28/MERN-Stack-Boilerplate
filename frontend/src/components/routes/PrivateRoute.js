import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UnlockAccess } from '../UnlockAccess'

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo && !loading ? (
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
