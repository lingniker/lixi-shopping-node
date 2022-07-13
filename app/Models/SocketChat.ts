import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SocketChat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public from: string

  @column()
  public to: string

  @column()
  public text: string

  @column()
  public type: string

  @column()
  public unread: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
