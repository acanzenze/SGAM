import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ModifyImpostoOnProdutos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('imposto')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.string('imposto')

    })
  }

  public async down () {
  }
}
