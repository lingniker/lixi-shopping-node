import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SocketUserState extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public session_id: string

  @column()
  public socket_id: string

  @column()
  public is_online: string

  @column()
  public invalid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
