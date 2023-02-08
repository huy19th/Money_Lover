import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
import multer from 'multer';
const upload = multer()
const TransactionRouter: Router = express.Router();

const transactionController = new TransActionController();
TransactionRouter.get('/transactions',transactionController.getTransactions)
TransactionRouter.post('/transactions/add',transactionController.addTransaction)
TransactionRouter.put('/transactions/update/:id',upload.none(),transactionController.updateTransaction)
export default TransactionRouter;