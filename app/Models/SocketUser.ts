import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SocketUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public socket_nick: string

  @column()
  public socket_avatar: string

  @column()
  public level: string

  @column()
  public time: string

  @column()
  public ban: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
