import BaseController from "./base.controller";
import { Request, Response } from "express";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";
import TransType from "../models/transtype.model";
import TransCate from "../models/transcate.model";
import Transaction from "../models/transaction.model";

let userRepo = dataSource.getRepository(User);
let walletRepo = dataSource.getRepository(Wallet);
let transTypeRepo = dataSource.getRepository(TransType);
let transCateRepo = dataSource.getRepository(TransCate);
let transactionRepo = dataSource.getRepository(Transaction);

class WalletController extends BaseController {

    test(req: Request, res: Response) {

    }
   
}

export default WalletController;