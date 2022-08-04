import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('data_emissao')
      table.dateTime('data_validade')
    })
  }
  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('data_emissao')
      table.dropColumn('data_validade')
    })
  }
}
