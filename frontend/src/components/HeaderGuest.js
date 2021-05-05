import { Link } from 'react-router-dom'
import { FaPlusCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

const HeaderGuest = () => {
  return (
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
        </div>
      </div>
    </nav>
  )
}

export default HeaderGuest
