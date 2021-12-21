import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import ProfileScreen from '../../screens/ProfileScreen'
import HomeScreen from '../../screens/HomeScreen'
import UserListScreen from '../../screens/UserListScreen'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import NotFound from '../../components/NotFound'
import LoginScreen from '../../screens/LoginScreen'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'

const AppRoutes = () => {
  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  let element = useRoutes([
    {
      path: '/',
      element: userInfo ? <HomeScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'profile',
      element: userInfo ? <ProfileScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'admin/users',
      element: userInfo ? <UserListScreen /> : <Navigate to='/login' />,
    },
    {
      path: 'admin/users/log',
      element: userInfo ? <UserLogHistoryScreen /> : <Navigate to='/login' />,
    },

    { path: 'login', element: <LoginScreen /> },
    { path: 'forgot', element: <ForgotPasswordScreen /> },
    { path: 'register', element: <RegisterScreen /> },
    { path: 'reset/:resetToken', element: <ResetPasswordScreen /> },

    { path: '*', element: <NotFound /> },
  ])
  return element
}

export default AppRoutes
