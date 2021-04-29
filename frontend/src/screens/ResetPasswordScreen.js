import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { resetResetPassword } from '../redux/users/usersSlice'

import { resetPassword } from '../redux/users/usersThunk'
import { useForm } from 'react-hook-form'

const ResetPasswordScreen = ({ history, match }) => {
  const resetToken = match.params.resetToken

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admin: false,
      user: false,
    },
  })

  const dispatch = useDispatch()
  const userResetPassword = useSelector((state) => state.userResetPassword)
  const {
    loadingResetPassword,
    errorResetPassword,
    successResetPassword,
    message: successMessage,
  } = userResetPassword

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (errorResetPassword || successResetPassword) {
      setTimeout(() => {
        dispatch(resetResetPassword())
      }, 5000)
    }
  }, [dispatch, errorResetPassword, successResetPassword])

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (successResetPassword) {
      reset()
      history.push('/login')
    }
  }, [successResetPassword, history, reset])

  const submitHandler = (data) => {
    const password = data.password
    dispatch(resetPassword({ password, resetToken }))
  }

  return (
    <FormContainer>
      <h3 className=''>Reset Password</h3>
      {successResetPassword && (
        <Message variant='success'>{successMessage}</Message>
      )}

      {errorResetPassword && (
        <Message variant='danger'>{errorResetPassword}</Message>
      )}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
            type='password'
            placeholder='Enter password'
            className='form-control'
          />
          {errors.password && (
            <span className='text-danger'>{errors.password.message}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
              validate: (value) =>
                value === watch().password || 'The passwords do not match',
            })}
            type='password'
            placeholder='Confirm password'
            className='form-control'
          />
          {errors.confirmPassword && (
            <span className='text-danger'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-light btn-sm'
          disabled={loadingResetPassword && true}
        >
          {loadingResetPassword ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Change'
          )}
        </button>
      </form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
