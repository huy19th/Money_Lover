import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import Wallet from "../models/wallet.model";

let walletRepo = dataSource.getRepository(Wallet);
const [INCOME, EXPENSE] = [1, 2];

class WalletServices extends BaseServices {
    static async getAllWalletsOfUser(userId: number): Promise<Wallet[] | null> {
        return await walletRepo.createQueryBuilder('wallet')
            .innerJoin('wallet.user', 'user')
            .select('wallet.name, wallet.balance, wallet.includeTotal, wallet.active, wallet.id')
            .where('user.id = :id', { id: userId })
            .getRawMany();
    }

    static async adjustBalance(walletId: number, money: number): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        wallet.balance -= money;
        await walletRepo.save(wallet);
    }

    static async updateBalance(walletId: number): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        let { totalIncome, totalExpense } = await this.getTotalIncomeExpenseOfWallet(walletId);
        wallet.balance = wallet.initialBalance + totalIncome - totalExpense;
        await walletRepo.save(wallet);
    }

    static async getWalletById(walletId: number): Promise<Wallet | null> {
        let wallet = await walletRepo.findOneBy({ id: walletId });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    }

    static async getTotalIncomeExpenseOfWallet(walletId: number) {
        let totalIncomeExpense = await walletRepo.createQueryBuilder("wallet")
            .innerJoin("wallet.transactions", "transaction")
            .innerJoin("transaction.subCategory", "subCategory")
            .innerJoin("subCategory.category", "category")
            .innerJoin("category.transType", "transType")
            .addSelect("SUM(transaction.money)", "sum")
            .addSelect("transType.id", "transType")
            .addGroupBy("transType.id")
            .where("wallet.id = :walletId", { walletId: walletId })
            .getRawMany();
        let totalIncomeDetail = totalIncomeExpense.filter(item => item.transType == INCOME)[0];
        let totalExpenseDetail = totalIncomeExpense.filter(item => item.transType == INCOME)[0];
        let totalIncome = totalIncomeDetail ? totalIncomeDetail.sum : 0;
        let totalExpense = totalExpenseDetail ? totalExpenseDetail.sum : 0;

        return { totalIncome: totalIncome, totalExpense: totalExpense }
    }

    static async getTotalBalance(userId: number): Promise<number> {
        let { totalBalance } = await walletRepo.createQueryBuilder("wallet")
            .innerJoin("wallet.user", "user")
            .addSelect("SUM(wallet.balance)", "totalBalance")
            .addGroupBy("user.id")
            .where("user.id = :id", { id: userId })
            .getRawOne();
        return totalBalance;
    }
}

export default WalletServices;