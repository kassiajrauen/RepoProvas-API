import {Router} from 'express';
import * as userController from '../controllers/userController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import userSchema from '../schemas/userSchema.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const userRouter = Router();

userRouter.post('/sign-up', validateSchemaMiddleware(userSchema), userController.signUp);
userRouter.post('/login', validateSchemaMiddleware(userSchema), userController.login);
userRouter.post('/logout', validateTokenMiddleware, userController.logout);

export default userRouter;