import express from "express";
import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import fileUpload from "express-fileupload";
import TransactionRouter from "./routers/transaction.router";

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
        this.app.use(fileUpload({
            createParentPath: true
        }))
        this.app.use(express.json())
        //
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json());
        // this.app.use(passport.initialize());
        // this.app.use(passport.session());
        this.app.use('/auth', AuthRouter);

        this.app.use('/api/transaction', TransactionRouter);
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

