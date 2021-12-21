import axios from 'axios'

const config = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        localStorage.getItem('userInfo') &&
        JSON.parse(localStorage.getItem('userInfo')).token
      }`,
    },
  }
}

export const getUsersLog = async (page) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/users/logs?page=${page}`,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUsers = async (page) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/users?page=${page}`,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/users/login`,
      credentials,
      config()
    )

    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const logout = () => {
  return localStorage.removeItem('userInfo')
}

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/users`,
      user,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const createGuestUser = async (user) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/users/register/guest`,
      user,
      config()
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUser = async (user) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/users/${user._id}`,
      user,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/users/${id}`,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const getUserDetails = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/users/${id}`,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateUserProfile = async (user) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/users/profile`,
      user,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/users/forgotpassword`,
      email,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const resetPassword = async (info) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/users/resetpassword/${info.resetToken}`,
      info,
      config()
    )
    return data
  } catch (error) {
    throw error.response.data.message
  }
}
