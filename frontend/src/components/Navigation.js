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
import { getGroups } from '../api/groups'
import Loader from 'react-loader-spinner'
import { logout } from '../api/users'
import { useMutation, useQuery } from 'react-query'

const Navigation = () => {
  const { data: groupData, isLoading } = useQuery('groups', () => getGroups(), {
    retry: 0,
  })

  const { mutateAsync } = useMutation(logout, () => {})
  useQuery('userInfo', () => {})

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const logoutHandler = () => {
    mutateAsync({})
  }

  const switchSideBarItems = (route) => {
    const { name, path } = route
    switch (name) {
      case 'Notice':
        return (
          <li className='nav-item'>
            <Link to={path} className='nav-link'>
              <FaUsers className='mb-1' /> {name}
            </Link>
          </li>
        )

      default:
        return null
    }
  }

  const switchSideBarDropdownAdmin = (route) => {
    const { name, path } = route

    switch (name) {
      case 'Routes':
        return (
          <li className='nav-item'>
            <Link to={path} className='dropdown-item'>
              <FaRoute className='mb-1' /> {name}
            </Link>
          </li>
        )
      case 'Groups':
        return (
          <li className='nav-item'>
            <Link to={path} className='dropdown-item'>
              <FaUsers className='mb-1' /> {name}
            </Link>
          </li>
        )
      case 'Users':
        return (
          <li className='nav-item'>
            <Link to={path} className='dropdown-item'>
              <FaUsers className='mb-1' /> {name}
            </Link>
          </li>
        )
      case 'User Logs':
        return (
          <li className='nav-item'>
            <Link to={path} className='dropdown-item'>
              <FaFileContract className='mb-1' /> {name}
            </Link>
          </li>
        )
      default:
        return null
    }
  }

  const switchSideBarDropdownProfile = (route) => {
    const { name, path } = route

    switch (name) {
      case 'Profile':
        return (
          <>
            <li>
              <Link to={path} className='dropdown-item'>
                <FaUser className='mb-1' /> {name}
              </Link>
            </li>
            <li>
              <Link to='/' onClick={logoutHandler} className='dropdown-item'>
                <FaPowerOff className='mb-1' /> Logout
              </Link>
            </li>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <Loader
            type='ThreeDots'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
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
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                {userInfo ? (
                  <>
                    {groupData &&
                      groupData.map(
                        (route) =>
                          route.name === userInfo.group &&
                          route.isActive &&
                          route.route.map((r) => (
                            <div key={r._id}> {switchSideBarItems(r)}</div>
                          ))
                      )}
                    {userInfo && userInfo.group === 'admin' && (
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
                          {groupData &&
                            groupData.map(
                              (route) =>
                                route.name === userInfo.group &&
                                route.isActive &&
                                route.route.map((r) => (
                                  <div key={r._id}>
                                    {switchSideBarDropdownAdmin(r)}
                                  </div>
                                ))
                            )}
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
                        {groupData &&
                          groupData.map(
                            (route) =>
                              route.name === userInfo.group &&
                              route.isActive &&
                              route.route.map((r) => (
                                <div key={r._id}>
                                  {' '}
                                  {switchSideBarDropdownProfile(r)}
                                </div>
                              ))
                          )}
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
      )}
    </>
  )
}

export default Navigation
