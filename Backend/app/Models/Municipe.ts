import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Municipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public residencia: string

  @column()
  public data_nascimento: Date

  @column()
  public pai: string

  @column()
  public mae: string

  @column()
  public estado: boolean

  @column()
  public email: string

  @column()
  public tefone: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
