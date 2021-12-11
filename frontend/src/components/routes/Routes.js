import React, { useEffect } from 'react'
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useRoutes,
} from 'react-router-dom'

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

const RoutesComponent = () => {
  let navigate = useNavigate()
  let location = useLocation()
  const { data: groupData, isLoading } = useQuery('groups', () => getGroups(), {
    retry: 0,
  })

  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  let group = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).group
    : null

  const apiRoutes = () => {
    const routesArray =
      groupData && groupData.find((item) => item.name === group)
    const routes = routesArray && routesArray.route
    return (
      routes &&
      routes.map((route) => ({
        path: route.path,
        element: <route.component />,
      }))
    )
  }

  console.log(apiRoutes())

  // const switchRoutes = (element) => {
  //   switch (element) {
  //     case 'ProfileScreen':
  //       return ProfileScreen
  //     case 'UserListScreen':
  //       return UserListScreen
  //     case 'UserLogHistoryScreen':
  //       return UserLogHistoryScreen
  //     case 'GroupScreen':
  //       return GroupScreen
  //     case 'RouteScreen':
  //       return RouteScreen
  //     default:
  //       return NotFound
  //   }
  // }
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
        { path: 'groups', element: <GroupScreen /> },
        { path: 'routes', element: <RouteScreen /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ])

  return userInfo ? privateElement : publicElement

  // return (
  //   <Routes>
  //     {publicElement}

  //     {/* {groupData &&
  //           groupData.map(
  //             (route) =>
  //               route.name === group &&
  //               route.isActive &&
  //               route.route.map((r) => (
  //                 <PrivateRoute
  //                   exact
  //                   path={r.path}
  //                   element={switchRoutes(r.element)}
  //                   role={[route.name]}
  //                 />
  //               ))
  //           )} */}
  //   </Routes>
  // )
}

export default RoutesComponent
