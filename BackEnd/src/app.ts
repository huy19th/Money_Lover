import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieSession from "cookie-session";
import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import AuthMiddleware from "./middlewares/auth.middlewares";
import TransSubCateRouter from "./routers/transsubcate.router";
import TransactionRouter from "./routers/transaction.router";
import WalletRouter from "./routers/wallet.router";
import UserRouter from "./routers/user.router";
import TransTypeRouter from "./routers/transtype.router";
import dataSource from "./database/data-source";
import Transaction from "./models/transaction.model";
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
        this.app.use(cors({
            credentials: true,
            origin: "http://localhost:3000",
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
        }));

        // Test

        this.app.get('/test', async (req, res) => {
            let transactionRepo = dataSource.getRepository(Transaction);
            let result = await transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.id')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.id', 'subCate_id')
                .addSelect('wallet.id', 'wallet_id')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('user.id = :id', { id: 1 })
                .andWhere('trans.date LIKE :date', {date: `2022-10%`})
                .getRawMany()
                .then((trans) => {
                    let arr = [];
                    let dates = trans.map(tran => {return tran.date.toString()})
                    let uniqueDate = Array.from(new Set(dates))
                    for (let i = 0; i < uniqueDate.length; i++) {
                        let obj = {
                            date: uniqueDate[i],
                            sum: 0,
                            transOfDate: []
                        }
                        for (let j = 0; j < trans.length; j++) {
                            if (trans[j].date.toString() === uniqueDate[i]) {
                                obj.transOfDate.push(trans[j])
                                if (trans[j].type_name === 'Income') {
                                    obj.sum += trans[j].money
                                } else {
                                    obj.sum -= trans[j].money
                                }
                            }
                        }
                        arr.push(obj)
                    }
                    return arr
                })

            res.json(result)
        })

        //

        this.app.use('/api/auth', AuthRouter);
        this.app.use(AuthMiddleware.checkAuthentication);
        this.app.use('/api/user', UserRouter)
        this.app.use('/api/transaction', TransactionRouter);
        this.app.use('/api/transaction-subcategory', TransSubCateRouter);
        this.app.use('/api/wallet', WalletRouter);
        this.app.use('/api/type', TransTypeRouter);

    }

    private listen(): void {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}

new App();















