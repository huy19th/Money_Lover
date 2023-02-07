import BaseController from "./base.controller";
import dataSource from "../database/data-source"
import TransactionModel from "../models/transaction.model";
import Wallet from "../models/wallet.model";
import SubCate from "../models/trans.subcate.model";

let transactionRepo = dataSource.getRepository(TransactionModel);
let walletRepo = dataSource.getRepository(Wallet);
let subCateRepo = dataSource.getRepository(SubCate);

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
        let {walletId, subcategoryId, money, date, image, note} = req.body
        let transaction = new TransactionModel()

        let wallet = await walletRepo.findOneBy({id: walletId})

        if (!wallet) {
            return res.status(404).json({message: 'Wallet not found'});
        }

        let subCate = await subCateRepo.findOneBy({id: subcategoryId});

        if (!subCate) {
            return res.status(404).json({message: 'Wallet not found'});
        }

        transaction.wallet = wallet;
        transaction.subCategory = subCate;
        transaction.money = money ? +money : null
        transaction.date = date ? date : null
        transaction.image = image
        transaction.note = note
        try {
            console.log(transaction)
            await transactionRepo.save(transaction);
            res.status(200).json(transaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
export default TransactionController;