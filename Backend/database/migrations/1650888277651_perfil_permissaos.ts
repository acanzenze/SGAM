import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PerfilPermissaos extends BaseSchema {
  protected tableName = 'perfil_permissaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('perfil_id').unsigned().references('perfis')
      table.integer('permissao_id').unsigned().references('permissaos')
      table.boolean('is_delete')

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
