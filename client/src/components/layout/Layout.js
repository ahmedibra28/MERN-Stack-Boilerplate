import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.png';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// Material UI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const Navbar = ({
  logout,
  auth: { isAuthenticated, loading, user },
  children,
}) => {
  const authLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        {' '}
        <a href='/' className='nav-link disabled'>
          {' '}
          Welcome {user && user.name}
        </a>
      </li>

      <li className='nav-item'>
        <Link to='/change-password' className='nav-link'>
          <LockOpenIcon fontSize='small' />
          Change Password
        </Link>
      </li>
      {user && user.role === 'Admin' && (
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            <PersonAddIcon fontSize='small' />
            Signup
          </Link>
        </li>
      )}

      <li className='nav-item'>
        <Link to='/' onClick={logout} className='nav-link'>
          <ExitToAppIcon fontSize='small' />
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <>
      <ul className='navbar-nav mr-auto mb-2 py-3 mb-lg-0'>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            <ExitToAppIcon fontSize='small' />
            Login
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <nav className='navbar navbar-expand-md navbar-light bg-light shadow sticky-top'>
        <div className='container'>
          <Link to='/' className='navbar-brand font-weight-bold display-6'>
            <img
              src={logo}
              width='60'
              height='auto'
              className='d-inline-block align-top'
              alt='brand'
            />
          </Link>
          <button
            className='navbar-toggler shadow-none'
            type='button'
            data-toggle='collapse'
            data-target='#navbarToggler'
            aria-controls='navbarToggler'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarToggler'>
            <ul className='navbar-nav mx-auto mb-2 mb-lg-0'></ul>
            <ul className='navbar-nav mx-right mb-2 mb-lg-0'>
              {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
            </ul>
          </div>
        </div>
      </nav>

      <div className=''>{children}</div>

      <div className='text-muted card-footer my-5  text-center footer'>
        Developer Contact -{' '}
        <strong>
          <a href='mailto:ahmaat19@gmail.com'>ahmaat19@gmail.com</a>
        </strong>
      </div>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
