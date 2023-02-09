import BaseServices from "./base.services";
import Transaction from "../models/transaction.model";
import dataSource from "../database/data-source";

let transactionRepo = dataSource.getRepository(Transaction);

class TransactionServices extends BaseServices {

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