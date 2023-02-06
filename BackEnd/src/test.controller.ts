import BaseController from "./controllers/base.controller";
import { Request, Response } from "express";
import dataSource from "./database/data-source";
import User from "./models/user.model";
import Wallet from "./models/wallet.model";
import TransType from "./models/trans.type.model";
import TransCate from "./models/trans.cate.model";
import Transaction from "./models/transaction.model";

let userRepo = dataSource.getRepository(User);
let walletRepo = dataSource.getRepository(Wallet);
let transTypeRepo = dataSource.getRepository(TransType);
let transCateRepo = dataSource.getRepository(TransCate);
let transactionRepo = dataSource.getRepository(Transaction);

class TestController extends BaseController {

    async createUser(req: Request, res: Response) {
        try {
            let user = new User();
            let { email, password, name, image } = req.body;
            user.email = email;
            user.password = password;
            user.name = name;
            user.image = image;
            await userRepo.save(user);
            res.status(200).json({ message: "OK" })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    // async getWallets(req: Request, res: Response) {
    //     try {
    //         let wallets = walletRepo.find({
    //             relations: {
    //                 userID: true
    //             }
    //         })
    //     }
    //     catch (err) {

    //     }
    // }

}

export default TestController;