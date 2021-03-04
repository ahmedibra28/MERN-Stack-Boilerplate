import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

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

// Reset Password
export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (resetPasswordData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

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

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',

  initialState: {},

  reducers: {
    alertForgotPasswordReset: (state) => {
      state.successForgotPassword = false
      state.errorForgotPassword = null
    },
  },
  extraReducers: {
    [forgotPassword.pending]: (state) => {
      state.loadingForgotPassword = true
    },

    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.loadingForgotPassword = false
      state.successForgotPassword = true
      state.message = payload
    },

    [forgotPassword.rejected]: (state, { error }) => {
      state.loadingForgotPassword = false
      state.errorForgotPassword = error.message
    },
  },
})

const resetPasswordSlice = createSlice({
  name: 'resetPassword',

  initialState: {},

  reducers: {
    alertResetPasswordReset: (state) => {
      state.successResetPassword = false
      state.errorResetPassword = null
    },
  },
  extraReducers: {
    [resetPassword.pending]: (state) => {
      state.loadingResetPassword = true
    },

    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loadingResetPassword = false
      state.successResetPassword = true
      state.message = payload
    },

    [resetPassword.rejected]: (state, { error }) => {
      state.loadingResetPassword = false
      state.errorResetPassword = error.message
    },
  },
})

export const { alertForgotPasswordReset } = forgotPasswordSlice.actions

export const { alertResetPasswordReset } = resetPasswordSlice.actions

export const forgotPasswordSliceReducer = forgotPasswordSlice.reducer
export const resetPasswordSliceReducer = resetPasswordSlice.reducer
