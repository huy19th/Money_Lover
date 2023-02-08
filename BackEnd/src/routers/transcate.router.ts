import express, {Router} from 'express';
import TransCateController from "../controllers/transcate.controller";
const TransCateRouter: Router = express.Router();

const transCateController = new TransCateController();



export default TransCateRouter;