import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../redux/users/usersThunk'
import { resetLoginState } from '../redux/users/usersSlice'
import { useForm } from 'react-hook-form'

const LoginScreen = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loadingLogin, errorLogin, userInfo } = userLogin

  useEffect(() => {
    if (errorLogin) {
      setTimeout(() => {
        dispatch(resetLoginState())
      }, 5000)
    }
  }, [dispatch, errorLogin])

  useEffect(() => {
    userInfo && history.push('/')
  }, [history, userInfo])

  const submitHandler = (data) => {
    dispatch(login(data))
  }
  return (
    <FormContainer>
      <h3 className=''>Sign In</h3>
      {errorLogin && <Message variant='danger'>{errorLogin}</Message>}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='mb-3'>
          <label htmlFor='email'>Email Address</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.+\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type='email'
            className='form-control'
            placeholder='Enter email'
            autoFocus
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', { required: 'Password is required' })}
            type='password'
            placeholder='Enter password'
            className='form-control'
          />
          {errors.password && (
            <span className='text-danger'>{errors.password.message}</span>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary '
          disabled={loadingLogin && true}
        >
          {loadingLogin ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className='row pt-3'>
        <div className='col'>
          <Link to='/forgotpassword'> Forgot Password</Link>
        </div>
      </div>
      <div className='row '>
        <div className='col'>
          New Customer?
          <Link to='/register'> Register</Link>
        </div>
      </div>
    </FormContainer>
  )
}

export default LoginScreen
