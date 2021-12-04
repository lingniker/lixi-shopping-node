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
  public sales_status_label: string

  @column()
  public price: string

  @column()
  public address_name: string

  @column()
  public address_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
