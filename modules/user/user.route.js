import {Router} from 'express'
import * as userController from './controller/user.controller.js'
import { auth } from '../middleware/auth.middleware.js'
import { asyncHandler } from '../Services/asyncHandler.js'
const router = Router()

router.get('/', auth ,asyncHandler(userController.getUser))
router.delete('/delete', auth ,asyncHandler(userController.deleteUser))
router.put('/update', auth ,asyncHandler(userController.updateUser))
router.patch('/change_password', auth ,asyncHandler(userController.changePassword))

export default router