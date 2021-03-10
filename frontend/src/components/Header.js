import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaUserCog,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa'
import { logout } from '../redux/users/loginSlice'
import { userDetailsReset } from '../redux/users/userDetailsSlice'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(userDetailsReset())
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
          <FaUserCircle className='mb-1' /> {userInfo && userInfo.name}
        </span>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <Link to='/profile' className='dropdown-item'>
              <FaUserCircle className='mb-1' /> Profile
            </Link>
          </li>
          <li>
            <Link to='/' onClick={logoutHandler} className='dropdown-item'>
              <FaSignOutAlt className='mb-1' /> Logout
            </Link>
          </li>
        </ul>
      </li>

      {userInfo && userInfo.roles.includes('Admin') && (
        <li className='nav-item dropdown'>
          <span
            className='nav-link dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <FaUserCog className='mb-1' /> Admin
          </span>
          <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <li>
              <Link to='/admin/users' className='dropdown-item'>
                <FaUsers className='mb-1' /> Users
              </Link>
            </li>
            <li>
              <Link to='/admin/users/logs' className='dropdown-item'>
                <FaInfoCircle className='mb-1' /> Users Log
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
          <FaUserPlus className='mb-1' /> Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          <FaSignInAlt className='mb-1' /> Login
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Boilerplate
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
