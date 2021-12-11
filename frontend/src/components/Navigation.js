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
  FaRoute,
  FaUser,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
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
      <div className='text-center'>
        <Loader
          type='ThreeDots'
          color='#00BFFF'
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>

      <nav className='navbar navbar-expand-sm navbar-light  shadow-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            DarkPro <FaPlusCircle className='mb-1' />
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
                <li>
                  <Link
                    to='/'
                    onClick={logoutHandler}
                    className='dropdown-item'
                  >
                    <FaPowerOff className='mb-1' /> Logout
                  </Link>
                </li>
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
