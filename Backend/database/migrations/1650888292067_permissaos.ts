import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissaos extends BaseSchema {
  protected tableName = 'permissaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('descrcao')
      table.string('slug')
      table.boolean('estado')
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
