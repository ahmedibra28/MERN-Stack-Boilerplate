import axios from 'axios'
import { Redirect } from 'react-router-dom'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${
  localStorage.getItem('userInfo') &&
  JSON.parse(localStorage.getItem('userInfo')).token
}`

export const getUsersLog = async () => {
  try {
    const { data } = await axios.get(`/api/users/logs?page=1`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`/api/users?page=1`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(`/api/users/login`, credentials)
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const logout = () => {
  Redirect('/login')
  return localStorage.removeItem('userInfo')
}

export const userInfoFn = () => {
  return (
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo'))
  )
}

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(`/api/users`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUser = async (user) => {
  try {
    const { data } = await axios.put(`/api/users/${user._id}`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUserDetails = async (id) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUserProfile = async (user) => {
  try {
    const { data } = await axios.put(`/api/users/profile`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(`/api/users/forgotpassword`, email)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const resetPassword = async (info) => {
  try {
    const { data } = await axios.put(
      `/api/users/resetpassword`,
      info,
      info.resetToken
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}
