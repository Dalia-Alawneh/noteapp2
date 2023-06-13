import { asyncHandler } from '../Services/asyncHandler.js'
import * as authController from './controller/auth.controller.js'
import {Router} from 'express' 
const router = Router()
router.post('/signup', asyncHandler(authController.signup))
router.post('/signin', asyncHandler(authController.signin))
export default router