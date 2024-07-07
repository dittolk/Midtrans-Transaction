import { Router } from 'express';
import { addUser, keepLoginUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/', addUser)
userRouter.get('/', keepLoginUser)

export { userRouter }