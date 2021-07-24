import express from 'express'
import {
  getGroup,
  addGroup,
  updateGroup,
  deleteGroup,
} from '../controllers/groupController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getGroup).post(protect, admin, addGroup)
router
  .route('/:id')
  .delete(protect, admin, deleteGroup)
  .put(protect, admin, updateGroup)

export default router
