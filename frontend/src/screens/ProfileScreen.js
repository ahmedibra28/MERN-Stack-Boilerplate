import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/users/usersThunk'
import FormContainer from '../components/FormContainer'
import { resetUpdateUserProfile } from '../redux/users/usersSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loadingUserDetail, errorUserDetail, user } = userDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { successUpdateUserProfile, errorUpdateUserProfile } = userUpdateProfile

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
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <FormContainer>
      <h3 className=''>User Profile</h3>
      {message && <Message variant='danger'>{message}</Message>}
      {errorUpdateUserProfile && (
        <Message variant='danger'>{errorUpdateUserProfile}</Message>
      )}
      {errorUserDetail && <Message variant='danger'>{errorUserDetail}</Message>}
      {successUpdateUserProfile && (
        <Message variant='success'>Profile Updated </Message>
      )}
      {loadingUserDetail && <Loader></Loader>}
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            placeholder='Enter name'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            className='form-control'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-light  btn-sm'>
          Update
        </button>
      </form>
    </FormContainer>
  )
}

export default ProfileScreen
