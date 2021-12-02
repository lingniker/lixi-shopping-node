import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public shop_name: string

  @column()
  public img_path: string

  @column()
  public describe: string

  @column()
  public stock: string

  @column()
  public sales_volume: string

  @column()
  public sales_status: string

  @column()
  public sales_status_describe: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
