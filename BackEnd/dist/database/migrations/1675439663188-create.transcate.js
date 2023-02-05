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
exports.CreateTableTransCate1675439663188 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableTransCate1675439663188 {
    constructor() {
        this.nameTable = 'trans_cate';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'type_id', type: 'int', isNullable: false },
                    { name: 'name', type: 'nvarchar(255)', isNullable: false },
                ],
            }));
            let fk_type_case = new typeorm_1.TableForeignKey({
                columnNames: ['type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'trans_type'
            });
            let cate_index = new typeorm_1.TableIndex({
                columnNames: ['type_id', 'name']
            });
            yield queryRunner.createForeignKey(this.nameTable, fk_type_case);
            yield queryRunner.createIndex(this.nameTable, cate_index);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.nameTable);
        });
    }
}
exports.CreateTableTransCate1675439663188 = CreateTableTransCate1675439663188;
//# sourceMappingURL=1675439663188-create.transcate.js.map