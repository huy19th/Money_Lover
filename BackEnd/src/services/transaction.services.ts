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
const [OTHER_INCOME_ID, OTHER_EXPENSE_ID] = [34, 20];

class TransactionServices extends BaseServices {

    static async getTransactions(userId, month, year) {
        return await transactionRepo.createQueryBuilder('trans')
            .innerJoin('trans.wallet', 'wallet')
            .innerJoin('wallet.user', 'user')
            .innerJoin('trans.subCategory', 'subCategory')
            .innerJoin('subCategory.category', 'category')
            .innerJoin('category.transType', 'type')
            .select('trans.money, trans.date, trans.note, trans.id')
            .addSelect('wallet.name', 'wallet_name')
            .addSelect('subCategory.id', 'subCate_id')
            .addSelect('wallet.id', 'wallet_id')
            .addSelect('subCategory.name', 'subCate_name')
            .addSelect('type.name', 'type_name')
            .where('user.id = :id', { id: userId })
            .andWhere('trans.date LIKE :date', {date: `${year}-${month}%`})
            .getRawMany()
            .then((trans) => {
                let arr = [];
                let dates = trans.map(tran => {return tran.date.toString()})
                let uniqueDate = Array.from(new Set(dates))
                for (let i = 0; i < uniqueDate.length; i++) {
                    let obj = {
                        date: uniqueDate[i],
                        sum: 0,
                        transOfDate: []
                    }
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].date.toString() === uniqueDate[i]) {
                            obj.transOfDate.push(trans[j])
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money
                            } else {
                                obj.sum -= trans[j].money
                            }
                        }
                    }
                    arr.push(obj)
                }
                return arr
            })
    }

    static async getTransactionsOfWallet(walletId, month, year) {
        return await transactionRepo.createQueryBuilder('trans')
            .innerJoin('trans.wallet', 'wallet')
            .innerJoin('wallet.user', 'user')
            .innerJoin('trans.subCategory', 'subCategory')
            .innerJoin('subCategory.category', 'category')
            .innerJoin('category.transType', 'type')
            .select('trans.money, trans.date, trans.note, trans.id')
            .addSelect('wallet.name', 'wallet_name')
            .addSelect('subCategory.id', 'subCate_id')
            .addSelect('wallet.id', 'wallet_id')
            .addSelect('subCategory.name', 'subCate_name')
            .addSelect('type.name', 'type_name')
            .where('wallet.id = :id', { id: walletId })
            .andWhere('trans.date LIKE :date', {date: `${year}-${month}%`})
            .getRawMany()
            .then((trans) => {
                let arr = [];
                let dates = trans.map(tran => {return tran.date.toString()})
                let uniqueDate = Array.from(new Set(dates))
                for (let i = 0; i < uniqueDate.length; i++) {
                    let obj = {
                        date: uniqueDate[i],
                        sum: 0,
                        transOfDate: []
                    }
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].date.toString() === uniqueDate[i]) {
                            obj.transOfDate.push(trans[j])
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money
                            } else {
                                obj.sum -= trans[j].money
                            }
                        }
                    }
                    arr.push(obj)
                }
                return arr
            })
    }

    static async deleteTransaction(transaction: Transaction): Promise<void> {
        await transactionRepo.remove(transaction);
    };

    static async getTransactionById(transactionId: number): Promise<Transaction> {
        let transaction = await transactionRepo.createQueryBuilder("transaction")
            .innerJoinAndSelect("transaction.wallet", "wallet")
            .where("transaction.id = :id", { id: transactionId })
            .getOne();
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        return transaction;
    }

    static async addTransaction(walletId, subcategoryId, money, date, image, note): Promise<void> {
        let wallet = await WalletServices.getWalletById(walletId);
        let subcategory = await TransSubCateServices.getSubCateById(subcategoryId);
        let transaction = new Transaction();

        transaction.wallet = wallet;
        transaction.subCategory = subcategory;
        transaction.money = money ? Number(money) : null;
        transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
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
        transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
        transaction.image = image;
        transaction.note = note;

        await transactionRepo.save(transaction);
    }
    static async addTransactionToAdjustBalance(walletId: number, balance: number): Promise<void> {
        let wallet = await WalletServices.getWalletById(walletId);
        let subcategoryId = balance > wallet.balance ? OTHER_INCOME_ID : OTHER_EXPENSE_ID;
        let money = Math.abs(balance - wallet.balance)
        await this.addTransaction(walletId, subcategoryId, money, new Date(), null, "Adjust Balance");
    }
}

export default TransactionServices;