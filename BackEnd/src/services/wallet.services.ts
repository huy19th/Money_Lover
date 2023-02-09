import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import Wallet from "../models/wallet.model";

let walletRepo = dataSource.getRepository(Wallet)

class WalletService extends BaseServices {
    async adjustBalance(walletId: number, money: number): Promise<void> {
        let wallet = await walletRepo.findOneBy({id: walletId});
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        wallet.balance -= money;
        await walletRepo.save(wallet);
    }
}

export default WalletService;