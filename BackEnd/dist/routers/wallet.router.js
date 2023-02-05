"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const WalletRouter = express_1.default.Router();
const walletController = new wallet_controller_1.default();
exports.default = WalletRouter;
//# sourceMappingURL=wallet.router.js.map