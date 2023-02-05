"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransCate = void 0;
const typeorm_1 = require("typeorm");
let TransCate = class TransCate {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "int", name: "id" })
    //@ts-ignore
], TransCate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "type_id", nullable: false })
    //@ts-ignore
], TransCate.prototype, "typeID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "nvarchar", name: "name", nullable: false })
    //@ts-ignore
], TransCate.prototype, "name", void 0);
TransCate = __decorate([
    (0, typeorm_1.Entity)()
], TransCate);
exports.TransCate = TransCate;
exports.default = TransCate;
//# sourceMappingURL=transcate.model.js.map