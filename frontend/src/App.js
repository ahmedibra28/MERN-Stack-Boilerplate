import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Routes from './components/routes/Routes'
import { useDispatch } from 'react-redux'

import { logout } from './redux/users/loginSlice'

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
      <main className='container-fluid'>
        <div className='row'>
          <div className='col-2 px-0'>
            <Header />
          </div>
          <div className='col-10 px-0 py-4'>
            <Route component={Routes} />
          </div>
        </div>
      </main>
    </Router>
  )
}

export default App
