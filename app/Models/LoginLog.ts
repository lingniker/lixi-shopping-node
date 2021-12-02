import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LoginLog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_name: string

  @column()
  public ip: string

  @column()
  public login_massage: string

  @column()
  public login_type: string

  @column()
  public browser_type: string

  @column()
  public system: string

  @column()
  public query: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
