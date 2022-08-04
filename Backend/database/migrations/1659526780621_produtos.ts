import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produtos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
      this.schema.alterTable(this.tableName, (table) => {
        table.integer('tipo_solicitacao_id').unsigned().references('id').inTable('tipo_solicitacaos').onDelete('CASCADE')
      })
  }

}
