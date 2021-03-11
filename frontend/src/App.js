import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Routes from './components/routes/Routes'
import { useDispatch } from 'react-redux'
import 'animate.css'
import { FaBars } from 'react-icons/fa'

import { logout } from './redux/users/loginSlice'

const App = () => {
  const [toggle, setToggle] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.userInfo) dispatch(logout())
    })
    if (localStorage.userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'))
      const decoded = jwt_decode(token.token)
      if (decoded.exp * 1000 < Date.now()) dispatch(logout())
    }
  }, [dispatch])
  return (
    <Router>
      <main className='d-flex'>
        <Header toggle={toggle} />
        <div className='container-fluid main-content '>
          <button
            onClick={() => setToggle(!toggle)}
            className='btn btn-info mb-1 btn-sm toggle-btn shadow-none '
          >
            <FaBars className='mb-1' /> Toggler
          </button>
          <Route component={Routes} />
        </div>
      </main>
    </Router>
  )
}

export default App
