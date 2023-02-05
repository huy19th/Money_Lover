import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableUser1675439163054 implements MigrationInterface {

    nameTable: string = 'user';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true , generationStrategy: 'increment'},
                    { name: 'email', type: 'nvarchar(255)', isUnique: true, isNullable: false},
                    { name: 'password', type: 'nvarchar(255)', isNullable: false },
                    { name: 'name', type: 'nvarchar(255)', isNullable: true },
                    { name: 'image', type: 'nvarchar(500)', isNullable: true },
                ],
            }),
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void>{
        await queryRunner.dropTable(this.nameTable);
    }

}