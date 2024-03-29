import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Documento extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public codigo: string

  @column()
  public data_validade: string

  @column()
  public assinatura: string

  @column()
  public solicitacao_id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
