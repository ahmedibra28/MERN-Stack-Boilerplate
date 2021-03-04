import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (user, { getState }) => {
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
      const { data } = await axios.put(`/api/users/profile`, user, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',

  initialState: {},

  reducers: {
    alertReset: (state) => {
      state.success = false
      state.error = null
    },
  },

  extraReducers: {
    [updateUserProfile.pending]: (state) => {
      state.loading = true
    },

    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.success = true
    },

    [updateUserProfile.rejected]: (state, { error }) => {
      state.loading = false
      state.error = error.message
    },
  },
})

export const { alertReset } = updateUserProfileSlice.actions
export default updateUserProfileSlice.reducer
