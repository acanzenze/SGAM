import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Solicitacaos extends BaseSchema {
  protected tableName = 'solicitacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descricao')
      table.integer('tipo_solicitacao_id').unsigned().references('tipo_solicitacaos')
      table.integer('prioridade_id').unsigned().references('solicitacao_prioridades')
      table.integer('municipe_id').unsigned().references('municipes')
      table.string('documento')
      table.boolean('is_publicado')
      table.boolean('is_notificado')
      table.integer('estado').unsigned().references('solicitacao_estados')
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
