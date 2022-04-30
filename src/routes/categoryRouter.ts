import {Router} from 'express';
import * as categoryController from '../controllers/categoryController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const categoryRouter = Router();

categoryRouter.get("/categories", validateTokenMiddleware, categoryController.findMany);

export default categoryRouter;