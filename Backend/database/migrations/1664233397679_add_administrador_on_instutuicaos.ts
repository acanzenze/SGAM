import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAdministradorOnInstutuicaos extends BaseSchema {
  protected tableName = 'instituicaos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('administrador').after('logotipo')
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
