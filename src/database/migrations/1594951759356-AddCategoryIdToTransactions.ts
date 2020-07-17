import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class AddCategoryIdToTransactions1594951759356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('transactions', new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true
      }));

      await queryRunner.createForeignKey('transactions', new TableForeignKey({
        name: 'TransactionCategory', // Apelido para a coluna com chave estrangeira
        columnNames: ['category_id'], // Coluna que vai possuir a chave estrangeira
        referencedColumnNames: ['id'], // Coluna referenciada em categories
        referencedTableName: 'categories',
        onDelete: 'SET NULL', // Ao deletar, setar este campo como NULL
        onUpdate: 'CASCADE' // Refletir mudança em todas as tabelas
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

      await queryRunner.dropColumn('transactions', 'category_id');
    }
}
