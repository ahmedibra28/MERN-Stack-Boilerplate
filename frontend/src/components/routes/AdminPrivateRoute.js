import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo && !loading ? (
          <Redirect to='/login' />
        ) : userInfo && !userInfo.isAdmin ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default AdminPrivateRoute
