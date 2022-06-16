import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Distritos extends BaseSchema {
  protected tableName = 'distritos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.boolean('estado')
      table.integer('municipio_id').unsigned().references('municipios')
      table.integer('user_id').unsigned().references('users')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
