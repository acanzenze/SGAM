import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PerfilPermissao extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public perfil_id: number

  @column()
  public permissao_id: number

  @column()
  public is_delete: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
