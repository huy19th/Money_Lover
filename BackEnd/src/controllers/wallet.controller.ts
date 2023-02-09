import BaseController from "./base.controller";

import {Request, Response} from "express";
import WalletModel, {Wallet} from "../models/wallet.model";

import User from "../models/user.model"
import dataSource from "../database/data-source";
import transactionController from "./transaction.controller";
import TransactionModel, {Transaction} from "../models/transaction.model";
import SubCate from "../models/trans.subcate.model";

import WalletService from "../services/wallet.services";

let walletRepo = dataSource.getRepository(WalletModel);
let userRepo = dataSource.getRepository(User);
let subCateRepo = dataSource.getRepository(SubCate);
let transactionRepo = dataSource.getRepository(TransactionModel);

class WalletController extends BaseController {

    static async getAllWallet(req: Request, res: Response) {
        try {
            let user = await userRepo.find({

                relations: {
                    wallets: true

                },
                where: {
                    id: Number(req.params.userId)
                }

            })
            res.status(200).json(user)

        } catch (err) {
            res.status(500).json(err)
        }

    }

    static async getAllWalletsOfUser (req: Request, res: Response) {
        //@ts-ignore
        let userId = req.user.id;
        WalletService.getAllWalletsOfUser(userId)
        .then(wallets => {
            res.status(200).json(wallets);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

    static async indexWallet(req: Request, res: Response) {
        try {
            let wallet = await walletRepo.findOneBy({
                id: Number(req.params.walletId)
            })
            res.status(200).json(wallet)

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async addMoneyWallet(req: Request, res: Response) {

        try {
            let wallet = await walletRepo.findOneBy({id: Number(req.params.walletId)});
            let money = wallet.balance - (+req.body.balance)
            if (money < 0) {
                await transactionRepo.createQueryBuilder('transaction')
                    .insert()
                    .into(Transaction)
                    .values({
                        wallet: {
                            id: Number(req.params.walletId)
                        },
                        subCategory: {
                            id: 34
                        },
                        money: money * (-1),
                        date: new Date()
                    })
                    .execute()
            }

            if (money > 0) {
                await transactionRepo.createQueryBuilder('transaction')
                    .insert()
                    .into(Transaction)
                    .values({
                        wallet: {
                            id: Number(req.params.walletId)
                        },
                        subCategory: {
                            id: 20
                        },
                        money: -money,
                        date: new Date()

                    })
                    .execute()
            }

            wallet.balance = +req.body.balance
            await walletRepo.save(wallet)
            res.status(200).json(wallet.balance)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async getAllMoney(req: Request, res: Response) {
        try {
            let user = await userRepo.find({
                relations: {
                    wallets: true
                },
                where: {
                    id: Number(req.params.userId)
                }
            })
            let sum = 0
            user[0].wallets.map(wallet => {
                sum += wallet.balance
            })

            return res.status(200).json(sum)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}

export default WalletController;