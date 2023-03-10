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
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date
        let userId = req.user.id;
        TransactionServices.getTransactions(userId,req.query)
            .then(transactions => {
                res.json(transactions);
            })
    }

    static getTransactionsOfOneWallet(req: Request, res: Response) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date
        let walletId = req.params.walletId;
        TransactionServices.getTransactionsOfWallet(walletId, req.query)
            .then(transactions => {
                res.json(transactions);
            })
    }

    static getTransactionsByTypeNameOfAllWallets(req: any, res: Response) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date;
        // let typeName = req.query.typeName
        let userId = req.user.id;
        TransactionServices.getTransactionsByTypeName(userId,req.query)
            .then(transactions => {
                res.json(transactions)
            })
    }

    static getTransactionsByTypeNameOfOneWallet(req: Request, res: Response) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date;
        // let typeName = req.query.typeName
        let walletId = req.params.walletId;
        TransactionServices.getTransactionsByTypeNameOfWallet(walletId, req.query)
            .then(transactions => {
                res.json(transactions)
            })
    }

    static async addTransaction(req: Request, res: Response) {
        try {
            let { walletId, subcategoryId, money, date, image, note } = req.body
            await TransactionServices.addTransaction(walletId, subcategoryId, money, date, image, note);
            await WalletServices.updateBalance(walletId);
            res.status(200).json({ message: "Added transaction successfully" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

    static async updateTransaction(req: Request, res: Response) {
        try {
            let transactionId = Number(req.params.transactionId);
            let transaction = await TransactionServices.getTransactionById(transactionId);
            let previousWalletId = transaction.wallet.id;
            let currentWalletId = req.body.walletId;
            await TransactionServices.updateTransaction(transactionId, req.body);
            await WalletServices.updateBalance(previousWalletId);
            if (previousWalletId !== currentWalletId) {
                await WalletServices.updateBalance(currentWalletId);
            }
            res.status(200).json({message: "Updated transaction successfully"});
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }

    static async deleteTransaction(req: Request, res: Response) {
        try {
            console.log(req.params.transactionId)
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

