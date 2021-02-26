import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { forgotPassword } from '../actions/userActions'

const ForgotPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const userForgotPassword = useSelector((state) => state.userForgotPassword)
  const {
    loading,
    error,
    success,
    message: successMessage,
  } = userForgotPassword

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if (success) {
      setEmail('')
    }
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword({ email }))
  }
  return (
    <FormContainer>
      <h4>Forgot Password</h4>
      {success && <Message variant='success'>{successMessage}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='btn btn-info btn-sm'>
          Send
        </button>
      </form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
