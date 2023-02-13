import BaseController from "./base.controller";

import {Request, Response} from "express";
import WalletModel, {Wallet} from "../models/wallet.model";

import User from "../models/user.model"
import dataSource from "../database/data-source";
import transactionController from "./transaction.controller";
import TransactionModel, {Transaction} from "../models/transaction.model";
import SubCate from "../models/trans.subcate.model";
import transactionType from "../models/trans.type.model";
import TransactionServices from "../services/transaction.services";
import WalletServices from "../services/wallet.services";

let walletRepo = dataSource.getRepository(WalletModel);
let userRepo = dataSource.getRepository(User);
let subCateRepo = dataSource.getRepository(SubCate);
let transactionRepo = dataSource.getRepository(TransactionModel);
let transactionTypeRepo = dataSource.getRepository(transactionType);

class WalletController extends BaseController {

    static getAllWalletsOfUser (req: Request, res: Response) {
        //@ts-ignore
        let userId = req.user.id;
        WalletServices.getAllWalletsOfUser(userId)
        .then(wallets => {
            res.status(200).json(wallets);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

    static getWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.getWalletById(walletId)
        .then(wallet => {
            res.status(200).json(wallet);
        })
        .catch(err => {
            res.status(500).json({message: err.message || this.defaultErrorMessage});
        })
    }

    static async adjustBalance(req: Request, res: Response) {
        try {
            let {walletId, balance} = req.body;
            await TransactionServices.addTransactionToAdjustBalance(walletId, balance);
            await WalletServices.updateBalance(walletId);
            res.status(200).json("Adjusted balance succesfully!");
        }
        catch (err) {
            res.status(500).json({message: err.message || this.defaultErrorMessage});
        }
    }

    static async getTotalBalance(req: Request, res: Response) {
        try {
            //@ts-ignore
            let totalBalance = await WalletServices.getTotalBalance(req.user.id);
            return res.status(200).json(totalBalance);
        }
        catch (err) {
            res.status(500).json(err.message || this.defaultErrorMessage);
        }
    }
    static getTotalIncomeExpenseOfWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.getTotalIncomeExpenseOfWallet(walletId)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
    }

    static getWalletsByIncludedIntotal(req: Request, res: Response) {
        //@ts-ignore
        let userId = req.user.id;
        let isIncluded = req.params.isIncluded == "true" ? true : false;
        WalletServices.getWalletsByIncludedInTotal(userId, isIncluded)
        .then(wallets => {
            res.status(200).json(wallets);
        })
        .catch(err => {
            res.status(500).json(err.message || this.defaultErrorMessage);
        })
    }
}

export default WalletController;