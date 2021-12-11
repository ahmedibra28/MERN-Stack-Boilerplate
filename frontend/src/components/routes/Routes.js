import React, { useEffect } from 'react'
import { useNavigate, useLocation, useRoutes } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'

const RoutesComponent = () => {
  let navigate = useNavigate()
  let location = useLocation()

  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  useEffect(() => {
    location.key === 'default' && navigate('/')
  }, [navigate, location])

  let publicElement = useRoutes([
    { path: '/', element: <HomeScreen /> },
    { path: '/login', element: <LoginScreen /> },
    { path: '/forgot', element: <ForgotPasswordScreen /> },
    { path: '/register', element: <RegisterScreen /> },
    { path: '/reset/:resetToken', element: <ResetPasswordScreen /> },
    { path: '*', element: <NotFound /> },
  ])

  let privateElement = useRoutes([
    { path: '/', element: <HomeScreen /> },
    { path: '/profile', element: <ProfileScreen /> },
    {
      path: '/admin',
      children: [
        { path: 'users', element: <UserListScreen /> },
        { path: 'users/logs', element: <UserLogHistoryScreen /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ])

  return userInfo ? privateElement : publicElement
}

export default RoutesComponent
