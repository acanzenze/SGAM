import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Municipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public estado: boolean

  @column()
  public pai: string

  @column()
  public mae: string

  @column()
  public residencia: string

  @column()
  public email: string

  @column()
  public telefone: string

  @column()
  public bairro_id: number

  @column()
  public user_id:number

  @column()
  public tipo_municipe_id: number

  @column()
  public genero_id:number

  @column()
  public data_nascimento: Date

  @column()
  public estado_cil_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
