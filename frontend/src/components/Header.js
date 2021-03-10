import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa'
import { logout } from '../redux/users/loginSlice'
import { userDetailsReset } from '../redux/users/userDetailsSlice'

const Header = ({ toggle }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(userDetailsReset())
  }

  const authLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0 d-flex flex-column justify-content-between vh-100 position-fixed '>
      <div className='' style={{ marginTop: '7rem' }}>
        {userInfo && userInfo.roles.includes('Admin') && (
          <>
            <li className='nav-item'>
              <Link to='/admin/users' className='nav-link'>
                <FaUsers className='mb-1' /> Users
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/admin/users/logs' className='nav-link'>
                <FaInfoCircle className='mb-1' /> Users Log
              </Link>
            </li>
          </>
        )}

        <li className='nav-item'>
          <Link to='/profile' className='nav-link'>
            <FaUserCircle className='mb-1' /> Profile
          </Link>
        </li>
      </div>
      <div className='mb-5'>
        <li className='nav-item'>
          <Link to='/' onClick={logoutHandler} className='nav-link'>
            <FaSignOutAlt className='mb-1' /> Logout
          </Link>
        </li>
      </div>
    </ul>
  )

  const guestLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0 d-flex flex-column justify-content-between vh-100 position-fixed'>
      <div></div>
      <div className='mb-5'>
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
      </div>
    </ul>
  )

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-dark bg-dark shadow-lg d-flex flex-column align-items-start min-vh-100 ${
        toggle && 'active-nav'
      }`}
      id='sidebar'
    >
      <div className='container-fluid d-flex flex-column align-items-start sticky-top '>
        <Link className='navbar-brand text-center ml-2 position-fixed' to='/'>
          <FaUserCircle className='display-3' /> <br />
          {userInfo && userInfo.name}
        </Link>

        {userInfo ? authLinks : guestLinks}
      </div>
    </nav>
  )
}

export default Header
