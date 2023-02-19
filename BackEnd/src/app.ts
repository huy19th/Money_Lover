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
import TransCateRouter from "./routers/transcate.router";
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
    // this.serveStaticFiles();
    this.listen();
  }

  // Static  files
  /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */

  private setupMiddlewares(): void {
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cookieSession({
        name: "session",
        keys: [this.appConfig.sessionKey],
        maxAge: this.appConfig.sessionMaxAge,
      })
    );
    this.app.use(
      cors({
        credentials: true,
        origin: this.appConfig.baseURL,
        methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
      })
    );
    // Test

    this.app.get('/test', async (req, res) => {
      let transactionRepo = dataSource.getRepository(Transaction)
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
          .where('wallet.id = :id', { id: 1 })
          .andWhere('trans.date LIKE :date', {date: `2023-02%`})
          .getRawMany()
          .then(trans => {
            let incomeTransaction = []
            let expenseTransaction = []
            trans.map(tran => {
                if (tran.type_name === 'Income') {
                    incomeTransaction.push(tran)
                } else {
                    expenseTransaction.push(tran)
                }
            })
            let incomeNames = Array.from(new Set(incomeTransaction.map(tran => {return tran.subCate_name})));
            let expenseNames = Array.from(new Set(expenseTransaction.map(tran => {return tran.subCate_name})));
            for (let i = 0; i < incomeNames.length; i++) {
                let obj = {
                    subCate_name: incomeNames[i],
                    sum: 0,
                    trans: []
                }
                for (let j = 0; j < incomeTransaction.length; j++) {

                }
            }
          })


        res.json(result)
    })

    //
    this.app.use("/api/auth", AuthRouter);
    this.app.use(AuthMiddleware.checkAuthentication);
    this.app.use("/api/transaction-subcategory", TransSubCateRouter);
    this.app.use("/api/transaction-category", TransCateRouter);
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/transaction", TransactionRouter);
    this.app.use("/api/wallet", WalletRouter);
    this.app.use("/api/type", TransTypeRouter);
  }

  private listen(): void {
    this.app.listen(this.appConfig.port, () => {
      console.log(`server started at http://localhost:${this.appConfig.port}`);
    });
  }
}

// tslint:disable-next-line:no-unused-expression
new App();
