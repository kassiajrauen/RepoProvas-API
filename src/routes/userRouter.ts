import {Router} from 'express';
import * as cardController from '../controllers/userController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import userSchema from '../schemas/userSchema.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const userRouter = Router();

userRouter.post('/sign-up', validateSchemaMiddleware(userSchema), cardController.signUp);
userRouter.post('/login', validateSchemaMiddleware(userSchema), cardController.login);
userRouter.post('/logout', validateTokenMiddleware, cardController.logout);

export default userRouter;