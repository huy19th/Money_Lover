import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
const TransactionRouter: Router = express.Router();

const transactionController = new TransActionController();
TransactionRouter.get('/transactions',transactionController.getTransactions)
TransactionRouter.post('/transactions/add',transactionController.addTransaction)

export default TransactionRouter;