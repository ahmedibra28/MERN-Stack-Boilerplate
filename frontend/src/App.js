import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Footer from './components/Footer'
import Routes from './components/routes/Routes'
import { useDispatch, useSelector } from 'react-redux'
import 'animate.css'
import { FaPowerOff, FaSlidersH } from 'react-icons/fa'
import { resetUpdateUser, logout } from './redux/users/usersSlice'

import HeaderGuest from './components/HeaderGuest'
import HeaderAuthorized from './components/HeaderAuthorized'

const App = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.userInfo) dispatch(logout())
    })
    window.addEventListener('click', () => {
      if (localStorage.userInfo) {
        const token = JSON.parse(localStorage.getItem('userInfo'))
        const decoded = jwt_decode(token.token)
        if (decoded.exp * 1000 < Date.now()) dispatch(logout())
      }
    })
  }, [dispatch])

  const style = {
    display: 'flex',
  }

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(resetUpdateUser())
  }

  const toggler = () => {
    const sidebar = document.querySelector('#sidebar')
    sidebar.classList.toggle('active')
  }

  return (
    <Router>
      <div className='wrapper' style={userInfo && style}>
        {userInfo ? <HeaderAuthorized toggler={toggler} /> : <HeaderGuest />}
        <main>
          {userInfo && (
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
            className={`${!userInfo ? 'container' : 'container'}`}
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
