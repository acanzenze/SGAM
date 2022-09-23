import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropEstdoOnUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('estado')
     
    })
  }

  public async down () {
    
  }
}
