import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OperLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_name: string

  @column()
  public ip: string

  @column()
  public oper_massage: string

  @column()
  public login_type: string

  @column()
  public browser_type: string

  @column()
  public system: string

  @column()
  public query: string

  @column()
  public response: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
