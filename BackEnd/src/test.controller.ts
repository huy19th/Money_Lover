import BaseController from "./controllers/base.controller";
import { Request, Response } from "express";
import dataSource from "./database/data-source";
import User from "./models/user.model";
import Wallet from "./models/wallet.model";
import TransType from "./models/transtype.model";
import TransCate from "./models/transcate.model";
import Transaction from "./models/transaction.model";

let userRepo = dataSource.getRepository(User);
let walletRepo = dataSource.getRepository(Wallet);
let transTypeRepo = dataSource.getRepository(TransType);
let transCateRepo = dataSource.getRepository(TransCate);
let transactionRepo = dataSource.getRepository(Transaction);

class TestController extends BaseController {

    createUser(req: Request, res: Response) {
        console.log("1234")
        console.log(req.body);
        res.status(200).json({message: "ok"})
    }
   
}

export default TestController;