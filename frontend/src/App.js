import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Routes from './components/routes/Routes'
import { useDispatch, useSelector } from 'react-redux'
import 'animate.css'

import { logout } from './redux/users/usersSlice'
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

  return (
    <Router>
      {userInfo ? <HeaderAuthorized /> : <HeaderGuest />}
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
