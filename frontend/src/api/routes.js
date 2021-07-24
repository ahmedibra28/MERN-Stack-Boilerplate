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

export const getRoutes = async () => {
  try {
    const { data } = await axios.get(`/api/routes`, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const addRoute = async (obj) => {
  try {
    const { data } = await axios.post(`/api/routes`, obj, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateRoute = async (obj) => {
  try {
    const { data } = await axios.put(`/api/routes/${obj._id}`, obj, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteRoute = async (id) => {
  try {
    const { data } = await axios.delete(`/api/routes/${id}`, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}
