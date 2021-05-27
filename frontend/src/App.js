import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Footer from './components/Footer'
import Routes from './components/routes/Routes'
import 'animate.css'
import { FaPowerOff, FaSlidersH } from 'react-icons/fa'

import { logout, userInfoFn } from './api/users'
import { useMutation, useQuery } from 'react-query'

import HeaderGuest from './components/HeaderGuest'
import HeaderAuthorized from './components/HeaderAuthorized'

const App = () => {
  const { mutateAsync } = useMutation(logout)
  useQuery('userInfo', userInfoFn)

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('userInfo')) mutateAsync({})
    })
    window.addEventListener('click', () => {
      if (localStorage.getItem('userInfo')) {
        const decoded = jwt_decode(
          localStorage.getItem('userInfo') &&
            JSON.parse(localStorage.getItem('userInfo')).token
        )

        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
    window.addEventListener('focus', () => {
      if (localStorage.getItem('userInfo')) {
        const decoded = jwt_decode(
          localStorage.getItem('userInfo') &&
            JSON.parse(localStorage.getItem('userInfo')).token
        )
        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
  }, [mutateAsync])

  const style = {
    display: 'flex',
  }

  const logoutHandler = () => {
    mutateAsync({})
  }

  const toggler = () => {
    const sidebar = document.querySelector('#sidebar')
    sidebar.classList.toggle('active')
  }

  return (
    <Router>
      <div
        className='wrapper'
        style={localStorage.getItem('userInfo') && style}
      >
        {localStorage.getItem('userInfo') ? (
          <HeaderAuthorized toggler={toggler} />
        ) : (
          <HeaderGuest />
        )}
        <main>
          {localStorage.getItem('userInfo') && (
            <nav className='navbar navbar-expand-sm navbar-dark sticky-top'>
              <div className='container-fluid'>
                <button
                  onClick={toggler}
                  className='navbar-brand btn btn-transparent shadow-none border-0'
                >
                  <FaSlidersH />
                </button>

                <ul className='navbar-nav d-flex flex-row'>
                  <li className='nav-item'>
                    <Link to='/' onClick={logoutHandler} className='nav-link'>
                      <FaPowerOff className='mb-1' /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          )}

          <div
            className={`${
              !localStorage.getItem('userInfo') ? 'container' : 'container'
            }`}
            id='mainContainer'
          >
            <Route component={Routes} />
          </div>
          <Footer />
        </main>
      </div>
    </Router>
  )
}

export default App
