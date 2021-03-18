import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './components/routes/Routes'
import { useDispatch } from 'react-redux'
import 'animate.css'

import { logout } from './redux/users/usersSlice'

const App = () => {
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
      <Header />
      <main>
        <div className='container'>
          <Route component={Routes} />
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
