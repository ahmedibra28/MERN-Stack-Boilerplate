import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logHistory,
  forgotPassword,
  resetPassword,
} from '../controllers/usersController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resetToken').put(resetPassword)

router.route('/login').post(authUser)
router.route('/logs').get(protect, admin, logHistory)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser)

export default router
