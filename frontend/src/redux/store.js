import { configureStore } from '@reduxjs/toolkit'
import userLoginSlice from './users/loginSlice'
import getUserLogHistorySlice from './users/logHistorySlice'
import getUserDetailsSlice from './users/userDetailsSlice'
import updateUserProfileSlice from './users/userProfileSlice'
import { forgotPasswordSliceReducer } from './users/resetPasswordSlice'
import { resetPasswordSliceReducer } from './users/resetPasswordSlice'
import {
  listUserSliceReducer,
  updateUserSliceReducer,
  deleteUserSliceReducer,
  registerUserSliceReducer,
} from './users/usersSlice'

export default configureStore({
  reducer: {
    userLogin: userLoginSlice,
    userLogHistory: getUserLogHistorySlice,
    userDetails: getUserDetailsSlice,
    userUpdateProfile: updateUserProfileSlice,
    userRegister: registerUserSliceReducer,
    userList: listUserSliceReducer,
    userDelete: deleteUserSliceReducer,
    userUpdate: updateUserSliceReducer,
    userForgotPassword: forgotPasswordSliceReducer,
    userResetPassword: resetPasswordSliceReducer,
  },
})
