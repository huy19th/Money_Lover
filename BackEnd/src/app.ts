import express from "express";
import cors from "cors";

import fileUpload from "express-fileupload";

import cookieSession from "cookie-session";
import passport from 'passport';

import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import AuthMiddleware from "./middlewares/auth.middlewares";
import TransSubCateRouter from "./routers/transsubcate.router";
import TransactionRouter from "./routers/transaction.router";
import WalletRouter from "./routers/wallet.router";
import UserRouter from "./routers/user.router";
import dataSource from "./database/data-source";
import User from "./models/user.model";
import Transaction from "./models/transaction.model";
import Wallet from "./models/wallet.model";

require('./passport')
class App {

    private app: express.Application = express();

    private appConfig = new AppConfig();

    constructor() {
        this.bootstrap();
    }

    public bootstrap(): void {
        this.setupMiddlewares();
        //this.serveStaticFiles();
        this.listen();

    }

    //Static  files
    /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */

    private setupMiddlewares(): void {
        this.app.use(fileUpload({
            createParentPath: true
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieSession({
            name: "session",
            keys: ["case-md6"],
            maxAge: 24 * 60 * 60 * 100
        }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(cors({
            credentials: true,
            origin: "http://localhost:3000",
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        }));

        this.app.use('/api/auth', AuthRouter);

        // Test
        this.app.get('/tester/:id', async (req: any, res) => {
            let userId = +req.params.id
            let walletRepo = dataSource.getRepository(Wallet);
            let transactionRepo = dataSource.getRepository(Transaction)
            let wallets = await walletRepo.createQueryBuilder('wallet')
                .innerJoin('wallet.user', 'user')
                .select('wallet.name, wallet.balance, wallet.includeTotal, wallet.active')
                .where('user.id = :id', {id: userId})
                .getRawMany();
            let transactions = await transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.image')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('user.id = :id', {id: userId})
                .getRawMany();
            res.json({
                wallets: wallets,
                trans: transactions
            })
        })


        this.app.use(AuthMiddleware.checkAuthentication);
        this.app.use('/api/user', UserRouter)
        this.app.use('/api/transaction', TransactionRouter);
        this.app.use('/api/transaction-subcategory', TransSubCateRouter);
        // this.app.use(TransTypeRouter);
        this.app.use('/api/wallet', WalletRouter);

    }

    private listen(): void {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}

new App();














