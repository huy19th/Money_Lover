import express, {Router} from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

const walletController = new WalletController();



export default WalletRouter;