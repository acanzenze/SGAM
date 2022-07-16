import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('email')
      table.string('estado')
      table.integer('telefone')
      table.string('pai')
      table.string('mae')
      table.integer('residencia')
      table.integer('data_nascimento')
      table.integer('estado_cil_id')
      table.integer('instituicao_id').unsigned().references('instituicaos')
      table.integer('user_id').unsigned().references('users')
      table.integer('bairro_id').unsigned().references('bairros')
      table.integer('tipo_municipe_id').unsigned().references('tipo_municipes')
      table.integer('genero_id').unsigned().references('generos')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
