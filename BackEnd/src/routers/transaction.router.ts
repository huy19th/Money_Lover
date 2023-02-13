import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";

const TransactionRouter: Router = express.Router();

TransactionRouter.delete('/:transactionId', TransActionController.deleteTransaction);
TransactionRouter.get('/',TransActionController.getTransactions);
TransactionRouter.post('/',TransActionController.addTransaction);
TransactionRouter.put('/:transactionId',TransActionController.updateTransaction);

export default TransactionRouter;