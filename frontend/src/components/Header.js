import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const authLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item dropdown'>
        <span
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {userInfo && userInfo.name}
        </span>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <Link to='/profile' className='dropdown-item'>
              Profile
            </Link>
          </li>
          <li>
            <Link to='/' onClick={logoutHandler} className='dropdown-item'>
              Logout
            </Link>
          </li>
        </ul>
      </li>

      {userInfo && userInfo.isAdmin && (
        <li className='nav-item dropdown'>
          <span
            className='nav-link dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Admin
          </span>
          <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <li>
              <Link to='/admin/users' className='dropdown-item'>
                Users
              </Link>
            </li>
            <li>
              <Link to='/admin/users/logs' className='dropdown-item'>
                Users Log
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  )

  const guestLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Navbar
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto mb-2 mb-lg-0'></ul>
          {userInfo ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  )
}

export default Header
