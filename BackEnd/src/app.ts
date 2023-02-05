import express, {Express, Router} from "express";
import path from "path";
import bodyParser from "body-parser";
import AuthRouter from "./routers/auth.router";
import TransactionRouter from "./routers/transaction.router";
import TransCateRouter from "./routers/transcate.router";
import TransTypeRouter from "./routers/transtype.router";
import WalletRouter from "./routers/wallet.router";
import AppConfig from "./config/app.config";
import passport from 'passport';
import TestRouter from "./test.router";

class App {
    
    private app: express.Application = express();

    private appConfig = new AppConfig();

    constructor() {
        this.bootstrap();
    }

    public bootstrap() : void {
        this.setupMiddlewares();
        //this.serveStaticFiles();
        this.listen();
    
    }

    //Static  files
    /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */ 

    private setupMiddlewares(): void {
        
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json());
        this.app.use(TestRouter);
        // this.app.use(passport.initialize());
        //this.app.use(passport.session());
        // this.app.use(AuthRouter);
        
        // this.app.use(TransactionRouter);
        // this.app.use(TransCateRouter);
        // this.app.use(TransTypeRouter);
        // this.app.use(WalletRouter);
    }

    private listen(): void {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}

new App();

