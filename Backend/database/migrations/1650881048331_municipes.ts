import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Municipes extends BaseSchema {
  protected tableName = 'municipes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('residencia')
      table.date('data_nascimento')
      table.string('pai')
      table.string('mae')
      table.string('email')
      table.bigInteger('telefone')
      table.boolean('estado')
      table.integer('bairro_id').unsigned().references('bairros')
      table.integer('tipo_municipe_id').unsigned().references('tipo_municipes')
      table.integer('genero_id').unsigned().references('generos')
      table.integer('estado_civil_id').unsigned().references('estado_civils')
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
