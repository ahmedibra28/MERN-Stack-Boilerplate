import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "./logo.png";

// Material UI Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const Navbar = ({
  logout,
  auth: { isAuthenticated, loading, user },
  children,
}) => {
  const authLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        {" "}
        <a href='/' className='nav-link disabled'>
          {" "}
          Welcome {user && user.name}
        </a>
      </li>

      <li className='nav-item'>
        <Link to='/change-password' className='nav-link'>
          <LockOpenIcon fontSize='small' />
          Change Password
        </Link>
      </li>
      {user && user.role === "Admin" && (
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
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            <img
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top mr-2 brand-logo'
              alt=''
              loading='lazy'
            />
            BLOOD BANK
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto mb-2 mb-lg-0'></ul>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </div>
        </div>
      </nav>
      <div className=''>{children}</div>
      <footer>
        <div className='text-muted card-footer my-5  text-center footer'>
          Developer Contact -{" "}
          <strong>
            <a href='mailto:ahmaat19@gmail.com'>ahmaat19@gmail.com</a>
          </strong>
          <span className='float-right'>v2</span>
        </div>
      </footer>
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
