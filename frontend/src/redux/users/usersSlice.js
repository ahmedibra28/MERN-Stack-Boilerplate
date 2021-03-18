import {
  listUsers,
  login,
  registerUser,
  updateUser,
  deleteUser,
  resetPassword,
  forgotPassword,
  updateUserProfile,
  getUserDetails,
  getUserLogHistory,
} from './usersThunk'
import { createSlice } from '@reduxjs/toolkit'

// login user
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
    resetLoginState: (state) => {
      state.successLogin = false
      state.errorLogin = null
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.loadingLogin = true
      state.errorLogin = null
    },
    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem('userInfo', JSON.stringify(payload))
      state.userInfo = payload
      state.loadingLogin = false
    },
    [login.rejected]: (state, { error }) => {
      state.loadingLogin = false
      state.errorLogin = error.message
    },
  },
})

// get all users
const listUserSlice = createSlice({
  name: 'listUser',
  initialState: {},
  reducers: {
    resetListUsers: (state) => {
      state.errorListUsers = null
    },
  },
  extraReducers: {
    [listUsers.pending]: (state) => {
      state.loadingListUsers = true
    },
    [listUsers.fulfilled]: (state, { payload }) => {
      state.loadingListUsers = false
      state.successListUsers = true
      state.users = payload
    },
    [listUsers.rejected]: (state, { error }) => {
      state.loadingListUsers = false
      state.errorListUsers = error.message
    },
  },
})

// update user
const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState: {},
  reducers: {
    resetUpdateUser: (state) => {
      state.successUpdateUser = false
      state.errorUpdateUser = null
    },
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.loadingUpdateUser = true
    },
    [updateUser.fulfilled]: (state) => {
      state.loadingUpdateUser = false
      state.successUpdateUser = true
    },
    [updateUser.rejected]: (state, { error }) => {
      state.loadingUpdateUser = false
      state.errorUpdateUser = error.message
    },
  },
})

// register new user
const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState: {},
  reducers: {
    resetRegisterUser: (state) => {
      state.successRegisterUser = false
      state.errorRegisterUser = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loadingRegisterUser = true
    },
    [registerUser.fulfilled]: (state) => {
      state.loadingRegisterUser = false
      state.successRegisterUser = true
    },
    [registerUser.rejected]: (state, { error }) => {
      state.loadingRegisterUser = false
      state.errorRegisterUser = error.message
    },
  },
})

// delete user
const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: {},
  reducers: {
    resetDeleteUser: (state) => {
      state.successDeleteUser = false
      state.errorDeleteUser = null
    },
  },
  extraReducers: {
    [deleteUser.pending]: (state) => {
      state.loadingDeleteUser = true
    },
    [deleteUser.fulfilled]: (state) => {
      state.loadingDeleteUser = false
      state.successDeleteUser = true
    },
    [deleteUser.rejected]: (state, { error }) => {
      state.loadingDeleteUser = false
      state.errorDeleteUser = error.message
    },
  },
})

// get log history
const getUserLogHistorySlice = createSlice({
  name: 'getUserLogHistory',
  initialState: {},
  extraReducers: {
    [getUserLogHistory.pending]: (state) => {
      state.loadingLogHistory = true
    },
    [getUserLogHistory.fulfilled]: (state, { payload }) => {
      state.loadingLogHistory = false
      state.logHistory = payload
    },
    [getUserLogHistory.rejected]: (state, { error }) => {
      state.loadingLogHistory = false
      state.errorLogHistory = error.message
    },
  },
})

// get user detail
const getUserDetailsSlice = createSlice({
  name: 'getUserDetails',
  initialState: {},
  reducers: {
    userDetailsReset: (state) => (state = {}),
  },

  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.loadingUserDetail = true
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loadingUserDetail = false
      state.user = payload
    },
    [getUserDetails.rejected]: (state, { error }) => {
      state.loadingUserDetail = false
      state.errorUserDetail = error.message
    },
  },
})

// update user profile
const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',
  initialState: {},
  reducers: {
    resetUpdateUserProfile: (state) => {
      state.success = false
      state.error = null
    },
  },

  extraReducers: {
    [updateUserProfile.pending]: (state) => {
      state.loadingUpdateUserProfile = true
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.loadingUpdateUserProfile = false
      state.userInfo = payload
      state.successUpdateUserProfile = true
    },
    [updateUserProfile.rejected]: (state, { error }) => {
      state.loadingUpdateUserProfile = false
      state.errorUpdateUserProfile = error.message
    },
  },
})

// forgot password
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {},
  reducers: {
    resetForgotPassword: (state) => {
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

// reset password
const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {},
  reducers: {
    resetResetPassword: (state) => {
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

export const userLoginSliceReducer = userLoginSlice.reducer
export const listUserSliceReducer = listUserSlice.reducer
export const updateUserSliceReducer = updateUserSlice.reducer
export const registerUserSliceReducer = registerUserSlice.reducer
export const deleteUserSliceReducer = deleteUserSlice.reducer
export const getUserLogHistorySliceReducer = getUserLogHistorySlice.reducer
export const getUserDetailsSliceReducer = getUserDetailsSlice.reducer
export const updateUserProfileSliceReducer = updateUserProfileSlice.reducer
export const forgotPasswordSliceReducer = forgotPasswordSlice.reducer
export const resetPasswordSliceReducer = resetPasswordSlice.reducer

export const { logout, resetLoginState } = userLoginSlice.actions
export const { resetListUsers } = listUserSlice.actions
export const { resetUpdateUser } = updateUserSlice.actions
export const { resetRegisterUser } = registerUserSlice.actions
export const { resetDeleteUser } = deleteUserSlice.actions
export const { resetUpdateUserProfile } = updateUserProfileSlice.actions
export const { resetForgotPassword } = forgotPasswordSlice.actions
export const { resetResetPassword } = resetPasswordSlice.actions
