import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bairros extends BaseSchema {
  protected tableName = 'bairros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.boolean('estado')
      table.integer('distrito_id').unsigned().references('distritos')
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
