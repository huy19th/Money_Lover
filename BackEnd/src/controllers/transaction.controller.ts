import BaseController from "./base.controller";
import dataSource from "../database/data-source"
import TransactionModel, { Transaction } from "../models/transaction.model";
import Wallet from "../models/wallet.model";
import SubCate from "../models/trans.subcate.model";
import TransactionServices from "../services/transaction.services";
import WalletServices from "../services/wallet.services";

import { Request, Response } from "express";

const [INCOME, EXPENSE] = ["Income", "Expense"];

class TransactionController extends BaseController {

    static getTransactions(req: any, res: Response) {
        let userId = req.user.id;
        TransactionServices.getTransactions(userId)
            .then(transactions => {
                res.json(transactions);
            })
    }

    static async addTransaction(req: Request, res: Response) {
        try {
            let { walletId, subcategoryId, money } = req.body
            await TransactionServices.addTransaction(req.body);
            await WalletServices.updateBalance(walletId);
            res.status(200).json({ message: "Added transaction successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateTransaction(req: Request, res: Response) {
        try {
            let transactionId = Number(req.params.id)
            let transaction = await TransactionServices.getTransactionById(transactionId);
            let previousWalletId = transaction.wallet.id;
            let currentWalletId = req.body.walletId;
            await TransactionServices.updateTransaction(transactionId, req.body);
            await WalletServices.updateBalance(previousWalletId);
            if (previousWalletId !== currentWalletId) {
                await WalletServices.updateBalance(currentWalletId);
            }
            res.status(200).json("Updated transaction successfully");
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }

    static async deleteTransaction(req: Request, res: Response) {
        try {
            let transactionId = Number(req.params.transactionId);
            let transaction = await TransactionServices.getTransactionById(transactionId);
            let walletId = transaction.wallet.id;
            await TransactionServices.deleteTransaction(transaction);
            await WalletServices.updateBalance(walletId);
            res.status(200).json({message: "Deleted transaction successfully"})
        }
        catch (err) {
            res.status(500).json({message: err.message})
        }
    }

}

export default TransactionController;

