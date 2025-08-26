import express from 'express'
import * as authController from '../controllers/auth'

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/use/otp', authController.useOtp)

export default router