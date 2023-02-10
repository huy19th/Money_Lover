import BaseServices from "./base.services";
import Transaction from "../models/transaction.model";
import dataSource from "../database/data-source";

let transactionRepo = dataSource.getRepository(Transaction);

class TransactionServices extends BaseServices {

    async getTransactions(userId) {
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

    async deleteTransaction(transaction: Transaction): Promise<void> {

        await transactionRepo.remove(transaction);
    };
    async getTransactionById(transactionId: number): Promise<Transaction | null> {
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
}

export default TransactionServices;