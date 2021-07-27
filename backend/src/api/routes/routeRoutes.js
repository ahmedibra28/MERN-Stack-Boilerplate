import express from 'express'
import {
  getRoute,
  addRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getRoute).post(protect, admin, addRoute)
router
  .route('/:id')
  .delete(protect, admin, deleteRoute)
  .put(protect, admin, updateRoute)

export default router
