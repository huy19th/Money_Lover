import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
import multer from 'multer';
const upload = multer()
const TransactionRouter: Router = express.Router();

const transactionController = new TransActionController();

TransactionRouter.delete('/:transactionId', transactionController.deleteTransaction);
TransactionRouter.get('/',transactionController.getTransactions)
TransactionRouter.post('/',transactionController.addTransaction)
TransactionRouter.put('/:transactionId',upload.none(),transactionController.updateTransaction)

export default TransactionRouter;