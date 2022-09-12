import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Solicitacaos extends BaseSchema {
  protected tableName = 'solicitacaos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_facturado').defaultTo(false)
    })
  }
  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_facturado')
    })
  }
}
