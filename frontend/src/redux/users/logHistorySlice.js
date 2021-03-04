import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getUserLogHistory = createAsyncThunk(
  'getUserLogHistory',
  async () => {
    const config = { headers: { 'Content-Type': 'application/json' } }

    try {
      const { data } = await axios.get(`/api/users/log`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

const getUserLogHistorySlice = createSlice({
  name: 'getUserLogHistory',

  initialState: {},

  extraReducers: {
    [getUserLogHistory.pending]: (state) => {
      state.loading = true
    },

    [getUserLogHistory.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.logHistory = payload
    },

    [getUserLogHistory.rejected]: (state, { error }) => {
      state.loading = false
      state.error = error.message
    },
  },
})

export default getUserLogHistorySlice.reducer
