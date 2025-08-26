import { Router } from 'express'
import * as authController from '../controllers/auth'

export const router = Router()

router.post('/auth/sigin', authController.sigin)
router.post('/auth/sigup', authController.sigup)