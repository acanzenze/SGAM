import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Solicitacao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public tipo_solicitacao_id: number

  @column()
  public prioridade_id: number

  @column()
  public municipe_id: number

  @column()
  public documento: string

  @column()
  public is_publicado: boolean

  @column()
  public is_notificado: boolean

  @column()
  public estado: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
