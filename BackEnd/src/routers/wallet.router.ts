import express, {Router} from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

WalletRouter.get('/',WalletController.getAllWalletsOfUser);
WalletRouter.get('/:walletId', WalletController.getWallet);
WalletRouter.patch('/balance', WalletController.adjustBalance);
WalletRouter.get('/balance/total', WalletController.getTotalBalance);
WalletRouter.get('/:walletId/income-expense', WalletController.getTotalIncomeExpenseOfWallet);


export default WalletRouter;