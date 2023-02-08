import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
const TransactionRouter: Router = express.Router();

const transactionController = new TransActionController();

TransactionRouter.delete('/:transactionId/', transactionController.deleteTransaction);

export default TransactionRouter;