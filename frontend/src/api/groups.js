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

export const getGroups = async () => {
  try {
    const { data } = await axios.get(`/api/groups`, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const addGroup = async (obj) => {
  try {
    const { data } = await axios.post(`/api/groups`, obj, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const updateGroup = async (obj) => {
  try {
    const { data } = await axios.put(`/api/groups/${obj._id}`, obj, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}

export const deleteGroup = async (id) => {
  try {
    const { data } = await axios.delete(`/api/groups/${id}`, config())
    return data
  } catch (error) {
    throw error.response.data.message
  }
}
