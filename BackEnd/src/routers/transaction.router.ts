import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
const TransactionRouter: Router = express.Router();

const transactionController = new TransActionController();


export default TransactionRouter;