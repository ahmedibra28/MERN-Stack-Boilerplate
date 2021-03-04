import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getUserDetails = createAsyncThunk(
  'getUserDetails',
  async (id, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    try {
      const { data } = await axios.get(`/api/users/${id}`, config)
      return data
    } catch (error) {
      throw error.message.data
    }
  }
)

const getUserDetailsSlice = createSlice({
  name: 'getUserDetails',

  initialState: {},

  reducers: {
    userDetailsReset: (state) => (state = {}),
  },

  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.loading = true
    },

    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.user = payload
    },

    [getUserDetails.rejected]: (state, { error }) => {
      state.loading = false
      state.error = error.message
    },
  },
})

export const { userDetailsReset } = getUserDetailsSlice.actions
export default getUserDetailsSlice.reducer
