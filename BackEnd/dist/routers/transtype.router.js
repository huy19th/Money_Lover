"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transtype_controller_1 = __importDefault(require("../controllers/transtype.controller"));
const TransTypeRouter = express_1.default.Router();
const transTypeController = new transtype_controller_1.default();
exports.default = TransTypeRouter;
//# sourceMappingURL=transtype.router.js.map