import BaseServices from "./base.services";
import Transaction from "../models/transaction.model";
import TransSubCate from "../models/trans.subcate.model";
import dataSource from "../database/data-source";
import WalletServices from "./wallet.services";
import TransSubCateServices from "./transsubcate.services";
import Wallet from "../models/wallet.model";

let transactionRepo = dataSource.getRepository(Transaction);
let transSubCateRepo = dataSource.getRepository(TransSubCate);

const [INCOME, EXPENSE] = ["Income", "Expense"];

class TransactionServices extends BaseServices {

    static async getTransactions(userId) {
        return await transactionRepo.createQueryBuilder('trans')
            .innerJoin('trans.wallet', 'wallet')
            .innerJoin('wallet.user', 'user')
            .innerJoin('trans.subCategory', 'subCategory')
            .innerJoin('subCategory.category', 'category')
            .innerJoin('category.transType', 'type')
            .select('trans.money, trans.date, trans.note')
            .addSelect('wallet.name', 'wallet_name')
            .addSelect('subCategory.name', 'subCate_name')
            .addSelect('type.name', 'type_name')
            .where('user.id = :id', {id: userId})
            .getRawMany();
    }

    static async deleteTransaction(transaction: Transaction): Promise<void> {
        await transactionRepo.remove(transaction);
    };

    static async getTransactionById(transactionId: number): Promise<Transaction | null> {
        let transactions =  await transactionRepo.find({
            relations: {
                wallet: {
                    user:true
                }
            },
            where: {
                id: transactionId
            }
        });
        return transactions[0];
    }

    static async addTransaction({ walletId, subcategoryId, money, date, image, note }): Promise<void> {
        let wallet = await WalletServices.getWalletById(walletId);
        let subcategory = await TransSubCateServices.getSubCateById(subcategoryId);
        let transaction =  new Transaction();

        transaction.wallet = wallet;
        transaction.subCategory = subcategory;
        transaction.money = money ? Number(money) : null;
        transaction.date = typeof date == 'string' ? date.substring(0, 9) : date;
        transaction.image = image;
        transaction.note = note;

        await transactionRepo.save(transaction);
    }

    static async updateTransaction(transactionId, { walletId, subcategoryId, money, date, image, note }): Promise<void> {
        let transaction = await this.getTransactionById(transactionId);
        let wallet = await WalletServices.getWalletById(walletId);
        let subcategory = await TransSubCateServices.getSubCateById(subcategoryId);

        transaction.wallet = wallet;
        transaction.subCategory = subcategory;
        transaction.money = money ? +money : null;
        transaction.date = typeof date == 'string' ? date.substring(0, 9) : date;
        transaction.image = image;
        transaction.note = note;
        
        await transactionRepo.save(transaction);
    }
}

export default TransactionServices;