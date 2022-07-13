import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SocketFriend extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public friend_1: string

  @column()
  public friend_2: string

  @column()
  public black: string

  @column()
  public blacklisted: string

  @column()
  public contact: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
