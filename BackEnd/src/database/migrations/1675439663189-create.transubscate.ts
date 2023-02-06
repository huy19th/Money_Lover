import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateTableTransSubCate1675439663189 implements MigrationInterface {

    nameTable: string = 'trans_subcate';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'cate_id', type: 'int', isNullable: false },
                    { name: 'name', type: 'nvarchar(255)', isNullable: false }
                ],
            }),
        )

        let fk_cate_case = new TableForeignKey({
            columnNames: ['cate_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trans_cate'
        });

        let subcate_index = new TableIndex({
            columnNames: ['cate_id', 'name']
        })

        await queryRunner.createForeignKey(this.nameTable, fk_cate_case);
        await queryRunner.createIndex(this.nameTable, subcate_index);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.nameTable);
    }

}