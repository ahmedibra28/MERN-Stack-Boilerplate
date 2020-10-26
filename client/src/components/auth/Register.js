import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// Material UI Icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const Register = ({ setAlert, register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 5000);
    } else {
      register({ name, email, password, role, history });
    }
  };

  // Redirect if logged in
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <div>
      <div className='container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <p className=' display-6 text-muted my-3 text-center'>SIGNUP</p>
            <hr />
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <FaceIcon />
                </span>
                <input
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                  type='text'
                  className='form-control py-2 shadow-none'
                  placeholder='Enter name'
                />
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <EmailIcon />
                </span>
                <input
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  type='email'
                  className='form-control py-2 shadow-none'
                  placeholder='Enter email'
                />
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <SupervisorAccountIcon />
                </span>
                <select
                  name='role'
                  value={role}
                  onChange={(e) => onChange(e)}
                  className='form-control py-2 shadow-none'
                >
                  <option value='' disabled>
                    Role...
                  </option>
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>
                </select>
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <VpnKeyIcon />
                </span>
                <input
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  type='password'
                  className='form-control py-2 shadow-none'
                  placeholder='Enter password'
                />
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <VpnKeyIcon />
                </span>
                <input
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  type='password'
                  className='form-control py-2 shadow-none'
                  placeholder='Enter confirm password'
                />
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              {/* <div className="form-group light">
                Already have an account? <Link to="/login">login</Link>
              </div> */}
              <div className='input-group mx-auto d-block text-right'>
                <button
                  type='submit'
                  className='btn-submit btn btn-outline-secondary  p-2 px-4'
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
