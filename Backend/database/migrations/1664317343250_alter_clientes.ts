import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterClientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('numero_documento').unique().alter()

    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
