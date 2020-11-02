import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI Icons
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row d-block'>
          <h3 className='text-muted my-3 text-center'>LOGIN</h3>

          <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
            <div className='input-group '>
              <span className='input-group-text' id='basic-addon1'>
                <EmailIcon fontSize='small' />
              </span>
              <input
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                type='email'
                className='form-control py-2 shadow-none'
                placeholder='Enter email'
                aria-label='email'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
            <div className='input-group '>
              <span className='input-group-text' id='basic-addon1'>
                <VpnKeyIcon fontSize='small' />
              </span>
              <input
                name='password'
                type='password'
                value={password}
                onChange={(e) => onChange(e)}
                className='form-control py-2 shadow-none'
                placeholder='Enter password'
                aria-label='password'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
            <div className='login-flex-helper'>
              {/* <div className='form-group light'>
                Don't you have an account? <Link to='/register'>Sigunp</Link>
              </div> */}
              {/* <div className="form-group light">
                <Link to="/reset-password">Forget Password</Link>
              </div> */}
            </div>

            <div className='input-group mx-auto d-block text-right'>
              <button
                type='submit'
                className='btn-submit btn btn-outline-secondary  p-2 px-4'
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
