import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { resetRegisterUser } from '../redux/users/usersSlice'

import { registerUser } from '../redux/users/usersThunk'
import { useForm } from 'react-hook-form'

const RegisterScreen = ({ location, history }) => {
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
  const userRegister = useSelector((state) => state.userRegister)
  const { loadingRegister, errorRegister, successRegisterUser } = userRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successRegisterUser || errorRegister) {
      setTimeout(() => {
        dispatch(resetRegisterUser())
      }, 5000)
    }
  }, [successRegisterUser, dispatch, errorRegister])

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (successRegisterUser) {
      reset()
    }
  }, [successRegisterUser])

  const submitHandler = (data) => {
    dispatch(registerUser(data))
  }
  return (
    <FormContainer>
      <h3 className=''>Sign Up</h3>
      {successRegisterUser && (
        <Message variant='success'>User has registered successfully</Message>
      )}

      {errorRegister && <Message variant='danger'>{errorRegister}</Message>}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type='text'
            placeholder='Enter name'
            className='form-control'
            autoFocus
          />
          {errors.name && (
            <span className='text-danger'>{errors.name.message}</span>
          )}
        </div>
        <div className='form-group'>
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
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>
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
          disabled={loadingRegister && true}
        >
          {loadingRegister ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <div className='row py-3'>
        <div className='col'>
          Have an Account?
          <Link to='/login'> Login</Link>
        </div>
      </div>
    </FormContainer>
  )
}

export default RegisterScreen
