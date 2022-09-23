import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddColAbreviaturaAndValidadeInTipoSolicitacaos extends BaseSchema {
  protected tableName = 'tipo_solicitacaos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('abreviatura').after('descricao')
      table.integer('validade').after('sla')
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
