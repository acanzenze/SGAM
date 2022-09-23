import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RenameQtdOnProdutos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('quantidade','imposto')
    })
  }

  public async down () {
    
  }
}
