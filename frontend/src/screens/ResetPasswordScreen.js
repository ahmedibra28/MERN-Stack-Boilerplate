import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  resetPassword,
  alertResetPasswordReset,
} from '../redux/users/resetPasswordSlice'

const ResetPasswordScreen = ({ history, match }) => {
  const resetToken = match.params.resetToken

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

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
        dispatch(alertResetPasswordReset())
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
      setPassword('')
      setConfirmPassword('')
      history.push('/login')
    }
  }, [successResetPassword, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(resetPassword({ password, resetToken }))
    }
  }

  return (
    <FormContainer>
      <h3>Reset Password</h3>
      {successResetPassword && (
        <Message variant='success'>{successMessage}</Message>
      )}
      {message && <Message variant='danger'>{message}</Message>}
      {errorResetPassword && (
        <Message variant='danger'>{errorResetPassword}</Message>
      )}
      {loadingResetPassword && <Loader></Loader>}
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            className='form-control'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-light btn-sm'>
          Change
        </button>
      </form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
