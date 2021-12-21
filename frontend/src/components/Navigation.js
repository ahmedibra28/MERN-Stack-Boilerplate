import { Link } from 'react-router-dom'
import {
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaPowerOff,
} from 'react-icons/fa'
import {
  FaCog,
  FaFileContract,
  FaUser,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa'
import { logout } from '../api/users'
import { useMutation, useQuery } from 'react-query'

const Navigation = () => {
  const { mutateAsync } = useMutation(logout, () => {})
  useQuery('userInfo', () => {})

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const logoutHandler = () => {
    mutateAsync({})
  }

  return (
    <>
      <nav className='navbar navbar-expand-sm navbar-light  shadow-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Geeltech <FaPlusCircle className='mb-1' />
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
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {userInfo ? (
                <>
                  {userInfo && userInfo.isAdmin && (
                    <li className='nav-item dropdown '>
                      <span
                        className='nav-link dropdown-toggle'
                        id='navbarDropdown'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <FaCog className='mb-1' /> Admin
                      </span>
                      <ul
                        className='dropdown-menu '
                        aria-labelledby='navbarDropdown'
                      >
                        <li className='nav-item'>
                          <Link to='/admin/users' className='dropdown-item'>
                            <FaUsers className='mb-1' /> Users
                          </Link>
                        </li>

                        <li className='nav-item'>
                          <Link to='/admin/users/log' className='dropdown-item'>
                            <FaFileContract className='mb-1' /> Logs
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className='nav-item dropdown'>
                    <span
                      className='nav-link dropdown-toggle'
                      id='navbarDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <FaUserCircle className='mb-1' />{' '}
                      {userInfo && userInfo.name}
                    </span>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='navbarDropdown'
                    >
                      <li>
                        <Link to='/profile' className='dropdown-item'>
                          <FaUser className='mb-1' /> Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/'
                          onClick={logoutHandler}
                          className='dropdown-item'
                        >
                          <FaPowerOff className='mb-1' /> Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
