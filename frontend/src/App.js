import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Routes from './components/routes/Routes'

import { USER_LOGOUT } from './constants/userConstants'
import store from './store'

const App = () => {
  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.userInfo) store.dispatch({ type: USER_LOGOUT })
    })
  }, [])
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
