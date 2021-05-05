import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaCog,
  FaFileContract,
  FaPowerOff,
  FaSlidersH,
  FaUser,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa'
import { resetUpdateUser, logout } from '../redux/users/usersSlice'

const HeaderAuthorized = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(resetUpdateUser())
  }

  const toggler = () => {
    const sidebar = document.querySelector('#sidebar')
    sidebar.classList.toggle('active')
  }

  return (
    <>
      <nav className='navbar navbar-expand-sm navbar-dark sticky-top'>
        <div className='container-fluid'>
          <button
            onClick={toggler}
            className='navbar-brand btn btn-transparent shadow-none border-0'
          >
            <FaSlidersH />
          </button>

          <ul className='navbar-nav d-flex flex-row'>
            <li className='nav-item'>
              <Link to='/' onClick={logoutHandler} className='nav-link'>
                <FaPowerOff className='mb-1' /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <nav className='' id='sidebar'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand fw-bold fs-6'>
            Boilerplate
          </Link>
          <ul
            className='navbar-nav text-light d-flex justify-content-between'
            style={{ height: 'calc(100vh - 100px)' }}
          >
            <div>
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
                      <FaUser className='mb-1' /> Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </div>

            {userInfo && userInfo.roles.includes('Admin') && (
              <>
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
                    <li>
                      <Link to='/admin/users' className='dropdown-item'>
                        <FaUsers className='mb-1' /> Users
                      </Link>
                    </li>
                    <li>
                      <Link to='/admin/users/logs' className='dropdown-item'>
                        <FaFileContract className='mb-1' /> Users Log
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default HeaderAuthorized
