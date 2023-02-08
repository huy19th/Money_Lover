import express, {Router} from 'express';
import TransTypeController from "../controllers/transtype.controller";
const TransTypeRouter: Router = express.Router();

const transTypeController = new TransTypeController();



export default TransTypeRouter;