import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Facturas extends BaseSchema {
  protected tableName = 'facturas'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('solicitacao_id').unsigned().references('id').inTable('solicitacaos').onDelete('CASCADE')
    })
  }
  public async down() {
    this.schema.table('facturas', (table) => {
      table.dropColumn('solicitacao_id')
    })
  }
}
