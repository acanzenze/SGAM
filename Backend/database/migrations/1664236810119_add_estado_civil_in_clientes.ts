import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddEstadoCivilInClientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('estado_civil').after('genero_id')
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
