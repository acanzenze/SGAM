import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Series extends BaseSchema {
  protected tableName = 'series'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.integer('numero')
      table.string('tipo_documento')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
