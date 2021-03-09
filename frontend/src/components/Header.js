import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../redux/users/loginSlice'
import { userDetailsReset } from '../redux/users/userDetailsSlice'
import { UnlockAccess } from './UnlockAccess'
import {
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(userDetailsReset())
  }

  const authLinks = (
    <>
      <li className='nav-item '>
        <Link to='/profile' className='nav-link'>
          <FaUserCircle className='mb-1' />{' '}
          <span className='hide'>Profile</span>
        </Link>
      </li>

      {UnlockAccess(['Admin']) && (
        <>
          <li className='nav-item'>
            <Link to='/admin/users' className='nav-link'>
              <FaUsers className='mb-1' /> <span className='hide'>Users</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/admin/users/logs' className='nav-link'>
              <FaInfoCircle className='mb-1' />{' '}
              <span className='hide'>Logs</span>
            </Link>
          </li>
        </>
      )}
    </>
  )

  const guestLinks = (
    <>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          <FaUserPlus className='mb-1' /> <span className='hide'>Register</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          <FaSignInAlt className='mb-1' /> <span className='hide'>Login</span>
        </Link>
      </li>
    </>
  )

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark vh-100 sticky-top sidebar  '>
        <div className='container-fluid d-flex flex-column justify-content-between vh100'>
          <Link className='navbar-brand pt-3 text-center' to='/'>
            {userInfo ? (
              <>
                <FaUserCircle className='fs-1' /> <br />
                <span className='hide'> {userInfo && userInfo.name}</span>{' '}
                <br />
                <div className='spinner-grow bg-success rounded-pill'>
                  <span className='fw-light' style={{ fontSize: '8px' }}>
                    Online
                  </span>
                </div>
              </>
            ) : (
              <div className='spinner-grow bg-danger rounded-pill'>
                <span className='fw-light' style={{ fontSize: '8px' }}>
                  Offline
                </span>
              </div>
            )}
          </Link>

          <ul className='navbar-nav d-flex flex-column'>
            {userInfo ? authLinks : guestLinks}
          </ul>
          {userInfo && authLinks && (
            <ul className='navbar-nav d-flex flex-column pb-4 '>
              <hr className='dropdown-divider hide' />
              <li className='nav-item'>
                <Link to='/' onClick={logoutHandler} className='nav-link'>
                  <FaSignOutAlt className='mb-1' />{' '}
                  <span className='hide'>Logout</span>
                </Link>
              </li>
              <hr className='dropdown-divider hide' />
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header
