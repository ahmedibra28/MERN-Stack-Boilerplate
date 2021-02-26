import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetPassword } from '../actions/userActions'

const ResetPasswordScreen = ({ location, history, match }) => {
  const resetToken = match.params.resetToken

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userResetPassword = useSelector((state) => state.userResetPassword)
  const { loading, error, success, message: successMessage } = userResetPassword

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if (success) {
      setPassword('')
      setConfirmPassword('')
      history.push('/login')
    }
  }, [success])

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
      {success && <Message variant='success'>{successMessage}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
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
        <button type='submit' className='btn btn-info btn-sm'>
          Change
        </button>
      </form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
