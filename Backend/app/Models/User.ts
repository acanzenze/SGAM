import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string
  @column()
  public email: string
  @column()
  public username: string
  @column()
  public password: string
  @column()
  public estado: boolean
  @column()
  public perfil_id: number
  @column()
  public instituicao_id: number
  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
