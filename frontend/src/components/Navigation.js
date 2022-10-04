import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaPowerOff } from 'react-icons/fa'
import useAuthHook from '../api/auth'
import { useMutation } from 'react-query'
import useAuth from '../hooks/useAuth'

const Navigation = () => {
  const navigate = useNavigate()
  const { postLogout } = useAuthHook()
  const { auth } = useAuth()

  const { mutateAsync } = useMutation(postLogout, {
    onSuccess: () => navigate('/auth/login'),
  })

  const logoutHandler = () => {
    mutateAsync({})
  }

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  const guestItems = () => {
    return (
      <>
        <ul className='navbar-nav ms-auto'>
          {/* <li className='nav-item'>
            <Link to='/auth/register' className='nav-link' aria-current='page'>
              <FaUserPlus className='mb-1' /> Register
            </Link>
          </li> */}
          <li className='nav-item'>
            <Link to='/auth/login' className='nav-link' aria-current='page'>
              <FaSignInAlt className='mb-1' /> Login
            </Link>
          </li>
        </ul>
      </>
    )
  }

  const user = () => {
    const userInfo = auth?.userInfo

    return userInfo
  }

  const menus = () => {
    const dropdownItems = auth?.userRole?.clientPermission?.map(
      (route) => route?.menu
    )

    const menuItems = auth?.userRole?.clientPermission?.map((route) => route)

    const dropdownArray =
      dropdownItems &&
      dropdownItems.filter((item) => item !== 'hidden' && item !== 'normal')

    const uniqueDropdowns = [...new Set(dropdownArray)]

    return { uniqueDropdowns, menuItems }
  }

  const authItems = () => {
    return (
      <>
        <ul className='navbar-nav ms-auto'>
          {menus() &&
            menus().menuItems.map(
              (menu) =>
                menu.menu === 'normal' &&
                menu.auth === true && (
                  <li key={menu._id} className='nav-item'>
                    <Link
                      to={menu.path}
                      className='nav-link'
                      aria-current='page'
                    >
                      {menu.name}
                    </Link>
                  </li>
                )
            )}

          {menus() &&
            menus().uniqueDropdowns.map((item) => (
              <li key={item} className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  id='navbarDropdownMenuLink'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {item === 'profile'
                    ? user() && user().name
                    : item.charAt(0).toUpperCase() + item.substring(1)}
                </a>
                <ul
                  className='dropdown-menu border-0'
                  aria-labelledby='navbarDropdownMenuLink'
                >
                  {menus() &&
                    menus().menuItems.map(
                      (menu) =>
                        menu.menu === item && (
                          <li key={menu._id}>
                            <Link to={menu.path} className='dropdown-item'>
                              {menu.name}
                            </Link>
                          </li>
                        )
                    )}
                </ul>
              </li>
            ))}

          <li className='nav-item'>
            <Link
              to='/auth/login'
              className='nav-link'
              aria-current='page'
              onClick={logoutHandler}
            >
              <FaPowerOff className='mb-1' /> Logout
            </Link>
          </li>
        </ul>
      </>
    )
  }

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <div className='container'>
        <Link to='/'>
          <img
            width='40'
            height='40'
            src='/favicon.png'
            className='img-fluid brand-logos'
            alt='logo'
          />
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          {userInfo ? authItems() : guestItems()}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
