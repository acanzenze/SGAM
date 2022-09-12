import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_documento: number

  @column()
  public total: number

  @column()
  public serie_id: number

  @column()
  public sigla: string

  @column()
  public estado_documento: string


  @column()
  public clinte_id: number

  @column()
  public solicitacao_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
