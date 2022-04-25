import express from 'express'
import { postUpload } from '../controllers/upload/index.js'

const router = express.Router()

// upload
router.route('/api/upload').post(postUpload)

export default router
