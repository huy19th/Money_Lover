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
exports.CreateTableTransAction1675439990693 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableTransAction1675439990693 {
    constructor() {
        this.nameTable = 'transaction';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment' },
                    { name: 'wallet_id', type: 'int', isNullable: false },
                    { name: 'category_id', type: 'int', isNullable: false },
                    { name: 'money', type: 'int', isNullable: false },
                    { name: 'date', type: 'date', isNullable: true },
                    { name: 'note', type: 'nvarchar(255)', isNullable: true },
                    { name: 'image', type: 'nvarchar(500)', isNullable: true },
                ],
            }));
            let fk_wallet_transaction = new typeorm_1.TableForeignKey({
                columnNames: ['wallet_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'wallet'
            });
            let fk_category_transaction = new typeorm_1.TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'trans_cate'
            });
            yield queryRunner.createForeignKeys(this.nameTable, [fk_wallet_transaction, fk_category_transaction]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.nameTable);
        });
    }
}
exports.CreateTableTransAction1675439990693 = CreateTableTransAction1675439990693;
//# sourceMappingURL=1675439990693-create.transaction.js.map