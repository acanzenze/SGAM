import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Facturas extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sigla')
      table.string('tipo_documento')
      table.integer('numero_documento')
      table.integer('total')
      table.boolean('estado_documento').defaultTo(true)
      table.integer('clinte_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.integer('serie_id').unsigned().references('id').inTable('series').onDelete('CASCADE')

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
