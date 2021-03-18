import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetForgotPassword } from '../redux/users/usersSlice'
import { forgotPassword } from '../redux/users/usersThunk'

const ForgotPasswordScreen = ({ history }) => {
  const [email, setEmail] = useState('')

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
  }, [dispatch, errorForgotPassword, successForgotPassword])

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (successForgotPassword) {
      setEmail('')
    }
  }, [successForgotPassword])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(forgotPassword({ email }))
  }
  return (
    <FormContainer>
      <h3 className='custom-text-yellow'>Forgot Password</h3>
      {successForgotPassword && (
        <Message variant='success'>{successMessage}</Message>
      )}
      {errorForgotPassword && (
        <Message variant='danger'>{errorForgotPassword}</Message>
      )}
      {loadingForgotPassword && <Loader></Loader>}
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
            autoFocus
          />
        </div>

        <button type='submit' className='btn btn-light btn-sm'>
          Send
        </button>
      </form>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
