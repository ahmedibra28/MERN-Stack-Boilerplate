import { Link } from 'react-router-dom'
import {
  FaCog,
  FaFileContract,
  FaRoute,
  FaUser,
  FaUserCircle,
  FaUsers,
} from 'react-icons/fa'
import { getGroups } from '../api/groups'
import { useQuery } from 'react-query'
import Loader from 'react-loader-spinner'

const HeaderAuthorized = () => {
  const { data: groupData, isLoading } = useQuery('groups', () => getGroups(), {
    retry: 0,
  })

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

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
          <li>
            <Link to={path} className='dropdown-item'>
              <FaUser className='mb-1' /> {name}
            </Link>
          </li>
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
        <nav className='sticky-top' id='sidebar'>
          <div className='container-fluid pt-3'>
            <Link to='/' className='navbar-brand fw-bold fs-6'>
              Boilerplate
            </Link>
            <ul
              className='navbar-nav text-light d-flex justify-content-between'
              style={{ height: 'calc(100vh - 100px)' }}
            >
              <div>
                {groupData &&
                  groupData.map(
                    (route) =>
                      route.name === userInfo.group &&
                      route.isActive &&
                      route.route.map((r) => (
                        <div key={r._id}> {switchSideBarItems(r)}</div>
                      ))
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
              </div>

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
            </ul>
          </div>
        </nav>
      )}
    </>
  )
}

export default HeaderAuthorized
