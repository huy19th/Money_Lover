import BaseController from "./base.controller";
import { Request, Response } from "express";
import TransactionServices from "../services/transaction.services";
import WalletService from "../services/wallet.services";

let transactionService = new TransactionServices();
let walletService = new WalletService();

class TransactionController extends BaseController {

    async deleteTransaction(req: Request, res: Response) {
        let transactionId = +req.params.transactionId;
        // let userId = +req.params.userId;
        let transaction = await transactionService.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({message: "Transaction not found"});
        }
        let money = transaction.money;
        let walletId = transaction.wallet.id;

        await walletService.adjustBalance(walletId, money);

        transactionService.deleteTransaction(transaction)
        .then(() => {
            res.status(200).json({message: 'Deleted transaction successfully'});
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        })
    }
   
}

export default TransactionController;