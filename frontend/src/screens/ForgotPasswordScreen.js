import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { resetForgotPassword } from '../redux/users/usersSlice'
import { forgotPassword } from '../redux/users/usersThunk'
import { useForm } from 'react-hook-form'

const ForgotPasswordScreen = ({ history }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const {
    loadingForgotPassword,
    errorForgotPassword,
    successForgotPassword,
    message: successMessage,
  } = userForgotPassword

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (errorForgotPassword || successForgotPassword) {
      setTimeout(() => {
        dispatch(resetForgotPassword())
      }, 5000)
    }
  }, [dispatch, errorForgotPassword, successForgotPassword, reset])

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (successForgotPassword) {
      reset()
    }
  }, [successForgotPassword, reset])

  const submitHandler = (data) => {
    dispatch(forgotPassword(data))
  }
  return (
    <FormContainer>
      <h3 className=''>Forgot Password</h3>
      {successForgotPassword && (
        <Message variant='success'>{successMessage}</Message>
      )}
      {errorForgotPassword && (
        <Message variant='danger'>{errorForgotPassword}</Message>
      )}

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
            placeholder='Enter email'
            className='form-control'
            autoFocus
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary  '
          disabled={loadingForgotPassword && true}
        >
          {loadingForgotPassword ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Send'
          )}
        </button>
      </form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
