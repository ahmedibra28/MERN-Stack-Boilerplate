import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { alertReset, login } from '../redux/users/loginSlice'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(alertReset())
      }, 5000)
    }
  }, [dispatch, error])

  useEffect(() => {
    userInfo && history.push('/')
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}

      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            className='form-control'
            placeholder='Enter email'
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-info btn-sm'>
          Sign In
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
