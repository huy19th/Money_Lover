"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
let Wallet = class Wallet {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "id" })
    //@ts-ignore
], Wallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "user_id", nullable: false })
    //@ts-ignore
], Wallet.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", name: "name", nullable: false })
    //@ts-ignore
], Wallet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "balance", nullable: true })
    //@ts-ignore
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: "include_total", nullable: true })
    //@ts-ignore
], Wallet.prototype, "includeTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", name: "active", nullable: true })
    //@ts-ignore
], Wallet.prototype, "active", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)()
], Wallet);
exports.Wallet = Wallet;
exports.default = Wallet;
//# sourceMappingURL=wallet.model.js.map