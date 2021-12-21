import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import 'animate.css'

import { logout } from './api/users'
import { useMutation, useQuery } from 'react-query'

import Navigation from './components/Navigation'
import AppRoutes from './components/routes/Routes'

const App = () => {
  const { mutateAsync } = useMutation(logout, () => {})
  useQuery('userInfo', () => {})

  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (userInfo) mutateAsync({})
    })
    window.addEventListener('click', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)

        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
    window.addEventListener('focus', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)
        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
  }, [mutateAsync, userInfo])

  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
