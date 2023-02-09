import express, {Router} from 'express';
import TransSubCateController from "../controllers/transsubcate.controller";

const TransSubCateRouter: Router = express.Router();

TransSubCateRouter.get('/:transTypeId', TransSubCateController.getAllSubCatesByType);

export default TransSubCateRouter;