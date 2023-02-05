"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const transaction_router_1 = __importDefault(require("./routers/transaction.router"));
const transcate_router_1 = __importDefault(require("./routers/transcate.router"));
const transtype_router_1 = __importDefault(require("./routers/transtype.router"));
const wallet_router_1 = __importDefault(require("./routers/wallet.router"));
const app_config_1 = __importDefault(require("./config/app.config"));
const passport_1 = __importDefault(require("passport"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.appConfig = new app_config_1.default();
        this.bootstrap();
    }
    bootstrap() {
        this.setupMiddlewares();
        //this.serveStaticFiles();
        this.listen();
    }
    //Static  files
    /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */
    setupMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(passport_1.default.initialize());
        //this.app.use(passport.session());
        this.app.use('/auth', auth_router_1.default);
        this.app.use('/user', user_router_1.default);
        this.app.use('/transaction', transaction_router_1.default);
        this.app.use(transcate_router_1.default);
        this.app.use(transtype_router_1.default);
        this.app.use(wallet_router_1.default);
    }
    listen() {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}
new App();
//# sourceMappingURL=app.js.map