import BaseController from "./base.controller";
import { Request, Response } from "express";
import WalletModel from "../models/wallet.model";
import User from "../models/user.model"
import dataSource from "../database/data-source";
import transactionController from "./transaction.controller";
import TransactionModel, {Transaction} from "../models/transaction.model";
import SubCate from "../models/trans.subcate.model";
let walletRepo = dataSource.getRepository(WalletModel)
let userRepo = dataSource.getRepository(User)
let subCateRepo = dataSource.getRepository(SubCate)
let transactionRepo = dataSource.getRepository(TransactionModel)

class WalletController extends BaseController {
    async getAllWallet(req,res){
        try {
            let user = await userRepo.find({
                relations : {
                   wallets :true
                },
                where : {
                    id : req.params.userId
                }

            })
            res.status(200).json(user)

        }
        catch (err) {
            res.status(500).json(err)
        }

    }
    async indexWallet(req, res){
        try {
            let wallet = await walletRepo.findOneBy({
                id : req.params.walletId
            })
            res.status(200).json(wallet)
        }
        catch (err) {
           res.status(500).json(err)
        }
    }
    async addMoneyWallet(req, res){
        try{
            let wallet = await walletRepo.findOneBy({id : req.params.walletId});
            let money = wallet.balance - (+req.body.balance)
            if(money < 0){
                await transactionRepo.createQueryBuilder('transaction')
                    .insert()
                    .into(Transaction)
                    .values({
                        wallet: {
                            id: req.params.walletId
                        },
                        subCategory: {
                            id: 34
                        },
                        money : money*(-1),
                        date : new Date()


                    })
                    .execute()
            }
            if(money > 0){
                await transactionRepo.createQueryBuilder('transaction')
                    .insert()
                    .into(Transaction)
                    .values({
                        wallet: {
                            id: req.params.walletId
                        },
                        subCategory: {
                            id: 20
                        },
                        money : -money,
                        date : new Date()

                    })
                    .execute()
            }

            wallet.balance = +req.body.balance
            await walletRepo.save(wallet)
            res.status(200).json(wallet.balance)
        }
        catch (err){
            res.status(500).json(err);
        }


    }

    
   
}

export default WalletController;