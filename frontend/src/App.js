import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Routes from './components/routes/Routes'
import { useDispatch } from 'react-redux'

import { USER_LOGOUT } from './constants/userConstants'
import store from './store'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.userInfo) store.dispatch({ type: USER_LOGOUT })
    })
    if (localStorage.userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'))
      const decoded = jwt_decode(token.token)
      if (decoded.exp * 1000 < Date.now()) dispatch({ type: USER_LOGOUT })
    }
  }, [dispatch])
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <div className='container'>
          <Route component={Routes} />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
