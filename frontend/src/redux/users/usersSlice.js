import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Register New User
export const registerUser = createAsyncThunk('registerUser', async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const { data } = await axios.post(`/api/users`, user, config)
    return data
  } catch (error) {
    throw error.response.data
  }
})

// Get All Users
export const listUsers = createAsyncThunk(
  'listUsers',
  async (_, { getState }) => {
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
      const { data } = await axios.get(`/api/users`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// Update Single User
export const updateUser = createAsyncThunk(
  'updateUser',
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
      const { data } = await axios.put(`/api/users/${user._id}`, user, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// Delete Single User
export const deleteUser = createAsyncThunk(
  'deleteUser',
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
      const { data } = await axios.delete(`/api/users/${id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

const listUserSlice = createSlice({
  name: 'listUser',

  initialState: {},

  reducers: {
    alertListUserReset: (state) => {
      state.errorUsers = null
    },
  },
  extraReducers: {
    [listUsers.pending]: (state) => {
      state.loadingUsers = true
    },

    [listUsers.fulfilled]: (state, { payload }) => {
      state.loadingUsers = false
      state.successUsers = true
      state.users = payload
    },

    [listUsers.rejected]: (state, { error }) => {
      state.loadingUsers = false
      state.errorUsers = error.message
    },
  },
})

const updateUserSlice = createSlice({
  name: 'updateUser',

  initialState: {},

  reducers: {
    alertUpdateUserReset: (state) => {
      state.successUpdate = false
      state.errorUpdate = null
    },
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.loadingUpdate = true
    },

    [updateUser.fulfilled]: (state) => {
      state.loadingUpdate = false
      state.successUpdate = true
    },

    [updateUser.rejected]: (state, { error }) => {
      state.loadingUpdate = false
      state.errorUpdate = error.message
    },
  },
})

const registerUserSlice = createSlice({
  name: 'registerUser',

  initialState: {},

  reducers: {
    alertRegisterUserReset: (state) => {
      state.successRegister = false
      state.errorRegister = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loadingRegister = true
    },

    [registerUser.fulfilled]: (state) => {
      state.loadingRegister = false
      state.successRegister = true
    },

    [registerUser.rejected]: (state, { error }) => {
      state.loadingRegister = false
      state.errorRegister = error.message
    },
  },
})

const deleteUserSlice = createSlice({
  name: 'deleteUser',

  initialState: {},

  reducers: {
    alertDeleteUserReset: (state) => {
      state.successDelete = false
      state.errorDelete = null
    },
  },
  extraReducers: {
    [deleteUser.pending]: (state) => {
      state.loadingDelete = true
    },

    [deleteUser.fulfilled]: (state) => {
      state.loadingDelete = false
      state.successDelete = true
    },

    [deleteUser.rejected]: (state, { error }) => {
      state.loadingDelete = false
      state.errorDelete = error.message
    },
  },
})

export const { alertDeleteUserReset } = deleteUserSlice.actions
export const { alertUpdateUserReset } = updateUserSlice.actions
export const { alertListUserReset } = listUserSlice.actions
export const { alertRegisterUserReset } = registerUserSlice.actions

export const listUserSliceReducer = listUserSlice.reducer
export const updateUserSliceReducer = updateUserSlice.reducer
export const registerUserSliceReducer = registerUserSlice.reducer
export const deleteUserSliceReducer = deleteUserSlice.reducer
