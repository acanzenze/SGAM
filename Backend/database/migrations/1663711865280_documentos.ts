import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Documentos extends BaseSchema {
  protected tableName = 'documentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo')
      table.date('data_validade')
      table.string('assinatura')
      table.integer('solicitacao_id').unsigned().references('id').inTable('solicitacaos')
      table.integer('user_id').unsigned().references('id').inTable('users')

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
