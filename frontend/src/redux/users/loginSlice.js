import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'userLogin',
  async (credentials, { dispatch }) => {
    const config = { headers: { 'Content-Type': 'application/json' } }

    try {
      const { data } = await axios.post(`/api/users/login`, credentials, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

const userLoginSlice = createSlice({
  name: 'userLogin',

  initialState: {
    userInfo:
      localStorage.getItem('userInfo') &&
      JSON.parse(localStorage.getItem('userInfo')) !== undefined &&
      JSON.parse(localStorage.getItem('userInfo')),
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo')
      return (state = {})
    },
    alertReset: (state) => {
      state.success = false
      state.error = null
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true
      state.error = null
    },

    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem('userInfo', JSON.stringify(payload))
      state.userInfo = payload
      state.loading = false
    },

    [login.rejected]: (state, { error }) => {
      state.loading = false
      state.error = error.message
    },
  },
})

export const { logout, alertReset } = userLoginSlice.actions

export default userLoginSlice.reducer
