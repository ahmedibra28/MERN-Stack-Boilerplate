import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import RegisterValidate from "../../validations/RegisterValidate";

// Material UI Icons
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import FaceIcon from "@material-ui/icons/Face";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const Register = ({ setAlert, register, isAuthenticated, history }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(RegisterValidate(formData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      register({ name, email, password, role, history });
      setFormData({
        ...formData,
        name: "",
        email: "",
        role: "",
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
            <h3 className='text-muted my-3 text-center'>SIGNUP</h3>

            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <FaceIcon fontSize='small' />
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
              {errors.name && (
                <div className='form-text text-danger'>{errors.name}</div>
              )}
            </div>
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
                />
              </div>
              {errors.email && (
                <div className='form-text text-danger'>{errors.email}</div>
              )}
            </div>
            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
              <div className='input-group '>
                <span className='input-group-text' id='basic-addon1'>
                  <SupervisorAccountIcon fontSize='small' />
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
              {errors.role && (
                <div className='form-text text-danger'>{errors.role}</div>
              )}
            </div>
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
                  placeholder='Enter confirm password'
                />
              </div>
              {errors.password2 && (
                <div className='form-text text-danger'>{errors.password2}</div>
              )}
            </div>
            <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto mb-2'>
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
