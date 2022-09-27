import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cliente extends BaseModel {
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
  public numeroDocumento: string
  @column()
  public generoId: string
  @column()
  public estado_civil: string
  @column()
  public dataNascimento: string
  @column()
  public municipioId: string
  @column()
  public distritoId: string
  @column()
  public bairroId: string
  @column()
  public tipoDocumentoId: string
  @column()
  public dataEmissao: string

  @column()
  public dataValidade: string
  @column()
  public endereco: number

  @column()
  public genero_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
