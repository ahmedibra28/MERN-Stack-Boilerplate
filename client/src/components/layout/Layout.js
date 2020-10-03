import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from './logo.jpg';

// Material UI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
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
        <a href='' className='nav-link'>
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
        <Link to='/login' onClick={logout} className='nav-link'>
          <ExitToAppIcon fontSize='small' />
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link to='/login' onClick={logout} className='nav-link'>
          <ExitToAppIcon fontSize='small' />
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className='navbar navbar-expand-md py-3 shadow'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarToggler'
            aria-controls='navbarToggler'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'>
              <MenuIcon fontSize='large' />
            </span>
          </button>
          <Link to='/' className='navbar-brand'>
            <img
              src='https://avatars0.githubusercontent.com/u/25323389?s=400&v=4'
              width='30'
              height='30'
              className='d-inline-block align-top mr-2'
              alt=''
              loading='lazy'
            />
            BOILERPLATE
          </Link>
          <div className='collapse navbar-collapse' id='navbarToggler'>
            <ul className='navbar-nav mr-auto mb-2 mb-lg-0'></ul>

            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </div>
        </div>
      </nav>

      <div className='container'>{children}</div>

      <div className='text-muted card-footer pt-20  text-center'>
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
