import {Router} from 'express';
import * as testController from '../controllers/testController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const testRouter = Router();

testRouter.get("/tests", validateTokenMiddleware, testController.getTests)
testRouter.patch("/tests/:id/views", validateTokenMiddleware, testController.views);

export default testRouter;