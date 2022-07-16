import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Municipes extends BaseSchema {
  protected tableName = 'municipios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.boolean('estado').defaultTo(true)
      table.integer('provincia_id').unsigned().references('id').inTable('provincias')
      table.integer('user_id').unsigned().references('users')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
