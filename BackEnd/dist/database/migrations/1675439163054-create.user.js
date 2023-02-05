"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1675439163054 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUser1675439163054 {
    constructor() {
        this.nameTable = 'user';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment' },
                    { name: 'email', type: 'nvarchar(255)', isUnique: true, isNullable: false },
                    { name: 'password', type: 'nvarchar(255)', isNullable: false },
                    { name: 'name', type: 'nvarchar(255)', isNullable: true },
                    { name: 'image', type: 'nvarchar(500)', isNullable: true },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.nameTable);
        });
    }
}
exports.CreateTableUser1675439163054 = CreateTableUser1675439163054;
//# sourceMappingURL=1675439163054-create.user.js.map