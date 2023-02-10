import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import Wallet from "../models/wallet.model";

let walletRepo = dataSource.getRepository(Wallet);

class WalletService extends BaseServices {
    static async getAllWalletsOfUser(userId: number): Promise<Wallet[] | null> {
        return await walletRepo.createQueryBuilder('wallet')
            .innerJoin('wallet.user', 'user')
            .select('wallet.name, wallet.balance, wallet.includeTotal, wallet.active, wallet.id')
            .where('user.id = :id', {id: userId})
            .getRawMany();
    }

    static async adjustBalance(walletId: number, money: number): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        wallet.balance -= money;
        await walletRepo.save(wallet);
    }

    static async getWalletById(walletId: number): Promise<Wallet | null> {
        let wallet = await walletRepo.findOneBy({id: walletId});
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    }
}

export default WalletService;