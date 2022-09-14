import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SolicitacaoClientes extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('clinte_id','cliente_id')
    })
  }

  public async down () {
    
  }
}
