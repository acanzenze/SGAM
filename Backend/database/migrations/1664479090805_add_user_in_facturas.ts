import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserInFacturas extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().after('serie_id').references('id').inTable('users')
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
