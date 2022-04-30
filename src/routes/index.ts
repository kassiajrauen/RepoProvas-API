import {Router} from 'express';
import userRouter from './userRouter.js';
import testRouter from './testRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();
router.use(userRouter);
router.use(testRouter);
router.use(categoryRouter);

export default router;