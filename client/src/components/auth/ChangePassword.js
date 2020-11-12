import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register, changePassword } from "../../actions/auth";
import PropTypes from "prop-types";
import ChangePasswordValidate from "../../validations/ChangePasswordValidate";

// Material UI Icons
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const ChangePassword = ({ setAlert, changePassword, history }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(ChangePasswordValidate(formData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      changePassword(formData, history);
      setFormData({
        ...formData,
        password: "",
        password2: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <div>
      <div className='container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='row d-block'>
            <h3 className='  text-muted my-3 text-center'>CHANGE PASSWORD</h3>

            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <VpnKeyIcon fontSize='small' />
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
              {errors.password && (
                <div className='form-text text-danger'>{errors.password}</div>
              )}
            </div>

            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <VpnKeyIcon fontSize='small' />
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
              {errors.password2 && (
                <div className='form-text text-danger'>{errors.password2}</div>
              )}
            </div>
            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
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
