import express from 'express'
import * as authController from '../controllers/auth'
import { verifyJWT } from '../middlewares/token-verify'

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/use/otp', authController.useOtp)
router.get('/greeting', verifyJWT, authController.greeting)

export default router
