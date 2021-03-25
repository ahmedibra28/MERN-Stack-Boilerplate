import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// header configuration
const configHeader = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
}

const configHeaderNormal = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

//   login
export const login = createAsyncThunk('userLogin', async (credentials) => {
  const config = configHeaderNormal()
  try {
    const { data } = await axios.post(`/api/users/login`, credentials, config)
    return data
  } catch (error) {
    throw error.response.data
  }
})

// register new user
export const registerUser = createAsyncThunk('registerUser', async (user) => {
  const config = configHeaderNormal()
  try {
    const { data } = await axios.post(`/api/users`, user, config)
    return data
  } catch (error) {
    throw error.response.data
  }
})

// update users
export const updateUser = createAsyncThunk(
  'updateUser',
  async (user, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.put(`/api/users/${user._id}`, user, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// get all users
export const listUsers = createAsyncThunk(
  'listUsers',
  async (_, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.get(`/api/users`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// delete user
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.delete(`/api/users/${id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// get log history
export const getUserLogHistory = createAsyncThunk(
  'getUserLogHistory',
  async (page) => {
    const config = configHeaderNormal()
    try {
      const { data } = await axios.get(`/api/users/log?page=${page}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// get user details
export const getUserDetails = createAsyncThunk(
  'getUserDetails',
  async (id, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.get(`/api/users/${id}`, config)
      return data
    } catch (error) {
      throw error.message.data
    }
  }
)

// update user profile
export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (user, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.put(`/api/users/profile`, user, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// forgot password
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (email) => {
    const config = configHeaderNormal()
    try {
      const { data } = await axios.post(
        `/api/users/forgotpassword`,
        email,
        config
      )
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// reset password
export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (resetPasswordData) => {
    const config = configHeaderNormal()

    try {
      const { data } = await axios.put(
        `/api/users/resetpassword/${resetPasswordData.resetToken}`,
        resetPasswordData,
        config
      )
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)
