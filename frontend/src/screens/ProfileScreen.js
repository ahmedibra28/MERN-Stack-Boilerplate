import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/users/usersThunk'
import FormContainer from '../components/FormContainer'
import { resetUpdateUserProfile } from '../redux/users/usersSlice'
import { useForm } from 'react-hook-form'

const ProfileScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loadingUserDetail, errorUserDetail, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    successUpdateUserProfile,
    errorUpdateUserProfile,
    loadingUpdateUserProfile,
  } = userUpdateProfile

  useEffect(() => {
    if (successUpdateUserProfile || errorUpdateUserProfile) {
      setTimeout(() => {
        dispatch(resetUpdateUserProfile())
      }, 5000)
    }
  }, [successUpdateUserProfile, errorUpdateUserProfile, dispatch])

  useEffect(() => {
    if (!user) {
      dispatch(getUserDetails('profile'))
    } else {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [dispatch, user, setValue])

  const submitHandler = (data) => {
    dispatch(updateUserProfile(data))
  }
  return (
    <FormContainer>
      <h3 className=''>User Profile</h3>
      {errorUpdateUserProfile && (
        <Message variant='danger'>{errorUpdateUserProfile}</Message>
      )}
      {errorUserDetail && <Message variant='danger'>{errorUserDetail}</Message>}
      {successUpdateUserProfile && (
        <Message variant='success'>Profile Updated </Message>
      )}
      {loadingUserDetail && <Loader></Loader>}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='mb-3'>
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
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', {
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
        <div className='mb-3'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            {...register('confirmPassword', {
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
          className='btn btn-primary  '
          disabled={loadingUpdateUserProfile && true}
        >
          {loadingUpdateUserProfile ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </FormContainer>
  )
}

export default ProfileScreen
