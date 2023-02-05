"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "id" })
    //@ts-ignore
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "type_id", nullable: false })
    //@ts-ignore
], Transaction.prototype, "typeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "category_id", nullable: false })
    //@ts-ignore
], Transaction.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "money", nullable: false })
    //@ts-ignore
], Transaction.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", name: "date", nullable: true })
    //@ts-ignore
], Transaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", name: "note", nullable: true })
    //@ts-ignore
], Transaction.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", name: "image", nullable: true })
    //@ts-ignore
], Transaction.prototype, "image", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
exports.Transaction = Transaction;
exports.default = Transaction;
//# sourceMappingURL=transaction.model.js.map