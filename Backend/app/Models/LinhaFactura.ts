import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LinhaFactura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public artigo: string

  @column()
  public total: number

  @column()
  public valor_unitario: number

  @column()
  public quantidade: number

  @column()
  public factura_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
