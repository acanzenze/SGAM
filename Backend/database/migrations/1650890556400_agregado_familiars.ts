import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AgregadoFamiliars extends BaseSchema {
  protected tableName = 'agregado_familiars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('profissao')
      table.date('data_nascimento')
      table.integer('grau_parentesco_id').unsigned().references('grau_parentescos')
      table.integer('municipe_id').unsigned().references('municipes')
      table.integer('user_id').unsigned().references('users')
      table.boolean('estado')

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
