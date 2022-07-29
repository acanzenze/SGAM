import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("genero").alter()
    })
  }
}
