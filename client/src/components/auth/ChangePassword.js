import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, changePassword } from '../../actions/auth';
import PropTypes from 'prop-types';

// Material UI Icons
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const ChangePassword = ({ setAlert, changePassword, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password confirmation does not match password', 'danger', 5000);
    } else {
      changePassword(formData, history);
      // console.log(formData);
    }
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <p className=' display-6 text-muted my-3 text-center'>
              CHANGE PASSWORD
            </p>
            <hr />

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
                  placeholder='Confirm new password'
                />
              </div>
            </div>
            <div className='col-lg-7 col-sm-12 mx-auto mb-3'>
              <div className='input-group mx-auto d-block text-right'>
                <button
                  type='submit'
                  className='btn-submit btn btn-outline-secondary  p-2 px-4'
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register, changePassword })(
  ChangePassword
);
