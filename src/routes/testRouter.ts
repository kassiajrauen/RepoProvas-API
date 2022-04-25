import {Router} from 'express';
import * as testController from '../controllers/testController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const testRouter = Router();

testRouter.get("/tests/teachers", validateTokenMiddleware, testController.getTestByTeacher);
testRouter.get("/tests/disciplines", validateTokenMiddleware, testController.getTestByDiscipline);

export default testRouter;