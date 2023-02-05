"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const TransactionRouter = express_1.default.Router();
const transactionController = new transaction_controller_1.default();
exports.default = TransactionRouter;
//# sourceMappingURL=transaction.router.js.map