import express, {Express, Router} from "express";
import path from "path";
import bodyParser from "body-parser";
import AuthRouter from "./routers/auth.router";
import UserRouter from "./routers/user.router";
import TransactionRouter from "./routers/transaction.router";
import TransCateRouter from "./routers/transcate.router";
import TransTypeRouter from "./routers/transtype.router";
import WalletRouter from "./routers/wallet.router";
import TestRouter from "./test.router";
import AppConfig from "./config/app.config";
import passport from 'passport';


const app = express();
let appConfig = new AppConfig();

app.use('/test', TestRouter);
app.use((req, res) => {res.status(200).json({message: "not found"})})
app.listen(appConfig.port, () => {
    console.log(`server started at http://localhost:${appConfig.port}`)
})


// class App {
    
//     private app: express.Application = express();

//     private appConfig = new AppConfig();

//     constructor() {
//         this.bootstrap();
//     }

//     public bootstrap() : void {
//         this.setupMiddlewares();
//         //this.serveStaticFiles();
//         this.listen();
    
//     }

//     //Static  files
//     /* private serveStaticFiles(): void {
//         this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
//     } */ 

//     private setupMiddlewares(): void {
//         // this.app.use(bodyParser.urlencoded({ extended: true }));
//         // this.app.use(bodyParser.json());
//         // this.app.use(passport.initialize());
//         //this.app.use(passport.session());
//         // this.app.use('/auth', AuthRouter);
//         // this.app.use('/user', UserRouter);
//         // this.app.use('/transaction', TransactionRouter);
//         // this.app.use(TransCateRouter);
//         // this.app.use(TransTypeRouter);
//         // this.app.use(WalletRouter);
//         this.app.use('/test', TestRouter);
//         this.app.use((req, res) => {res.status(200).json({message: "not found"})})
//     }

//     private listen(): void {
//         this.app.listen(this.appConfig.port, () => {
//             console.log(`server started at http://localhost:${this.appConfig.port}`);
//         });
//     }
// }

// new App();

