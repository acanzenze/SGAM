import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DocumentosIdentificacaos extends BaseSchema {
  protected tableName = 'documentos_identificacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo')
      table.string('numero_identificacao')
      table.date('data_emissao')
      table.date('data_vencimento')
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
