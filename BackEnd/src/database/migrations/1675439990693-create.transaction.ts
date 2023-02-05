import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableTransAction1675439990693 implements MigrationInterface {

    nameTable: string = 'transaction';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true , generationStrategy: 'increment'},
                    { name: 'wallet_id', type: 'int', isNullable: false },
                    { name: 'category_id', type: 'int', isNullable: false },
                    { name: 'money', type: 'int', isNullable: false },
                    { name: 'date', type: 'date' , isNullable: true},
                    { name: 'note', type: 'nvarchar(255)' , isNullable: true},
                    { name: 'image', type: 'nvarchar(500)' , isNullable: true},
                ],
            }),
        )

        let fk_wallet_transaction = new TableForeignKey({
            columnNames: ['wallet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'wallet'
        });

        let fk_category_transaction = new TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trans_cate'
        });

        await queryRunner.createForeignKeys(this.nameTable, [fk_wallet_transaction, fk_category_transaction]);
    }

    public async down (queryRunner: QueryRunner): Promise<void>{
        await queryRunner.dropTable(this.nameTable);
    }

}