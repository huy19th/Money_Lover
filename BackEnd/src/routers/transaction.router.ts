import express, {Router} from 'express';
import TransActionController from "../controllers/transaction.controller";
import multer from 'multer';
const upload = multer()
const TransactionRouter: Router = express.Router();

TransactionRouter.delete('/:transactionId', TransActionController.deleteTransaction);
TransactionRouter.get('/',TransActionController.getTransactions);
TransactionRouter.post('/',TransActionController.addTransaction);
TransactionRouter.put('/:transactionId',TransActionController.updateTransaction);
TransactionRouter.get('/income-expense/:walletId',TransActionController.getTotalIncomeExpenseOfWallet);

export default TransactionRouter;