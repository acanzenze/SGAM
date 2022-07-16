import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DocumentosIdentificacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo: string

  @column()
  public numero_identificacao: string

  @column()
  public data_emissao: Date

  @column()
  public data_vencimento: Date

  @column()
  public municipe_id: number

  @column()
  public user_id: number

  @column()
  public estado: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
