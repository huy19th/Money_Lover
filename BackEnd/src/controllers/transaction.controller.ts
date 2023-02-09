import BaseController from "./base.controller";
import dataSource from "../database/data-source"
import TransactionModel from "../models/transaction.model";
import Wallet from "../models/wallet.model";
import SubCate from "../models/trans.subcate.model";
import TransactionServices from "../services/transaction.services";
import WalletService from "../services/wallet.services";
import { Request, Response } from "express";


let transactionRepo = dataSource.getRepository(TransactionModel);
let walletRepo = dataSource.getRepository(Wallet);
let subCateRepo = dataSource.getRepository(SubCate);
let transactionService = new TransactionServices();
let walletService = new WalletService();

class TransactionController extends BaseController {
    async getTransactions(req, res) {
        try {
            let transaction = await transactionRepo.find({
                relations: {
                    wallet: true,
                    subCategory: true
                }

            })
            res.status(200).json(transaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async addTransaction(req, res) {
        let { walletId, subcategoryId, money, date, image, note } = req.body
        let transaction = new TransactionModel()

        let wallet = await walletRepo.findOneBy({ id: walletId })

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        let subCate = await subCateRepo.findOneBy({ id: subcategoryId });

        if (!subCate) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        transaction.wallet = wallet;
        transaction.subCategory = subCate;
        transaction.money = money ? +money : null
        transaction.date = date ? date : null
        transaction.image = image
        transaction.note = note
        try {
            await transactionRepo.save(transaction);
            res.status(200).json(transaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    async updateTransaction(req, res) {
        let transaction = await transactionRepo.findOneBy({ id: req.params.id })
        let { walletId, subcategoryId, money, date, image, note } = req.body
        let wallet = await walletRepo.findOneBy({ id: walletId })

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        let subCate = await subCateRepo.findOneBy({ id: subcategoryId });

        if (!subCate) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        transaction.wallet = wallet;
        transaction.subCategory = subCate;
        transaction.money = money ? +money : null
        transaction.date = date ? date : null
        transaction.image = image
        transaction.note = note
        try {
            await transactionRepo.save(transaction);
            res.status(200).json(transaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        let transactionId = +req.params.transactionId;
        //@ts-ignore
        let userId = req.user.id;
        let transaction = await transactionService.getTransactionById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        if (transaction.wallet.user.id !== userId) {
            return res.status(401).json({ message: "You don't have permission to delete" })
        }
        let money = transaction.money;
        let walletId = transaction.wallet.id;

        await walletService.adjustBalance(walletId, money);

        transactionService.deleteTransaction(transaction)
            .then(() => {
                res.status(200).json({ message: 'Deleted transaction successfully' });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }
}
export default TransactionController;
