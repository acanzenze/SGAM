import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddEstadoOnUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('estado').after('password')
    })
  }

  public async down () {
    
  }
}
