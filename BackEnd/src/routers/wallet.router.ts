import express, {Router} from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

WalletRouter.get('/',WalletController.getAllWalletsOfUser);

WalletRouter.get('/wallet/:id', WalletController.indexWallet);
WalletRouter.post('/:walletId/wallet/addMoney', WalletController.addMoneyWallet);
WalletRouter.get('/wallet/allMoney/:userId', WalletController.getAllMoney);
WalletRouter.get('/:walletId/income-expense', WalletController.getTotalIncomeExpenseOfWallet);


export default WalletRouter;