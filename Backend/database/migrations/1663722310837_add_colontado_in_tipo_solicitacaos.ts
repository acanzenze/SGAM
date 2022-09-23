import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddColontadoInTipoSolicitacaos extends BaseSchema {
  protected tableName = 'tipo_solicitacaos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('contador').after('validade')
    })
  }

  public async down () {
   // this.schema.dropTable(this.tableName)
  }
}
