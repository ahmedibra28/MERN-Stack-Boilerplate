import axios from 'axios'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      localStorage.getItem('userInfo') &&
      JSON.parse(localStorage.getItem('userInfo')).token
    }`,
  },
})

export const getUsersLog = async () => {
  try {
    const { data } = await api.get(`/api/users/logs?page=1`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUsers = async () => {
  try {
    const { data } = await api.get(`/api/users?page=1`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const login = async (credentials) => {
  try {
    const { data } = await api.post(`/api/users/login`, credentials)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const createUser = async (user) => {
  try {
    const { data } = await api.post(`/api/users`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUser = async (user) => {
  try {
    const { data } = await api.put(`/api/users/${user._id}`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/api/users/${id}`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUserDetails = async (id) => {
  try {
    const { data } = await api.get(`/api/users/${id}`)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUserProfile = async (user) => {
  try {
    const { data } = await api.put(`/api/users/profile`, user)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post(`/api/users/forgotpassword`, email)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const resetPassword = async (info) => {
  try {
    const { data } = await api.put(`/api/users/resetpassword`, info.resetToken)
    return data
  } catch (error) {
    throw error.response.data.message
  }
}
