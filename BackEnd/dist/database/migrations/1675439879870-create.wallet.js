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
exports.CreateTableWallet1675439879870 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableWallet1675439879870 {
    constructor() {
        this.nameTable = 'wallet';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', generationStrategy: 'increment', isPrimary: true },
                    { name: 'user_id', type: 'int', isNullable: false },
                    { name: 'name', type: 'nvarchar(255)', isNullable: false },
                    { name: 'balance', type: 'int', isNullable: false },
                    { name: 'include_total', type: 'boolean', default: true },
                    { name: 'active', type: 'boolean', default: true },
                ],
            }));
            let fk_user_wallet = new typeorm_1.TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user'
            });
            let wallet_index = new typeorm_1.TableIndex({
                columnNames: ['user_id', 'name']
            });
            yield queryRunner.createForeignKey(this.nameTable, fk_user_wallet);
            yield queryRunner.createIndex(this.nameTable, wallet_index);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.nameTable);
        });
    }
}
exports.CreateTableWallet1675439879870 = CreateTableWallet1675439879870;
//# sourceMappingURL=1675439879870-create.wallet.js.map