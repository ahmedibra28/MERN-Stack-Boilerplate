import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI Icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container__body'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <h3 className='text-center form-title mb-4'>Login</h3>
          <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
            <div className='input-group shadow'>
              <span className='input-group-text' id='basic-addon1'>
                <EmailIcon />
              </span>
              <input
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                type='email'
                className='form-control py-2'
                placeholder='Enter email'
                aria-label='email'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
          <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
            <div className='input-group shadow'>
              <span className='input-group-text' id='basic-addon1'>
                <VpnKeyIcon />
              </span>
              <input
                name='password'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
                className='form-control py-2'
                placeholder='Enter password'
                aria-label='password'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
          <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
            <div className='login-flex-helper'>
              <div className='form-group light'>
                Don't you have an account? <Link to='/register'>Sigunp</Link>
              </div>
              <div className='form-group light'>
                <Link to='/reset-password'>Forget Password</Link>
              </div>
            </div>

            <div className='input-group mx-auto d-block text-right'>
              <button
                type='submit'
                className='btn-submit btn btn-primary shadow p-2 px-4'
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
