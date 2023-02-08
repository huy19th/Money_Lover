import express, {Router} from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

const walletController = new WalletController();

WalletRouter.get('/:userId/wallet',walletController.getAllWallet);
WalletRouter.get('/wallet/:id',walletController.indexWallet)
WalletRouter.post('/:walletId/wallet/addMoney',walletController.addMoneyWallet)
WalletRouter.get('/wallet/allMoney/:userId',walletController.getAllMoney)
export default WalletRouter;