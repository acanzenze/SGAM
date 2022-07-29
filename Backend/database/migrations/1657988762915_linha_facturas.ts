import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinhaFacturas extends BaseSchema {
  protected tableName = 'linha_facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('artigo')
      table.integer('valor_unitario')
      table.integer('total')
      table.integer('quantidade')
      table.integer('factura_id').unsigned().references('id').inTable('facturas').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
