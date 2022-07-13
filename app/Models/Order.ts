import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public user_name: string

  @column()
  public user_address_id: string

  @column()
  public user_address_name: string

  @column()
  public shop_id: string

  @column()
  public shop_name: string

  @column()
  public shop_img_path: string

  @column()
  public shop_address_name: string

  @column()
  public shop_address_id: string

  @column()
  public shop_number: string

  @column()
  public shop_price: string

  @column()
  public shop_price_total: string

  @column()
  public order_status: string

  @column()
  public order_label: string

  @column()
  public send_status: string

  @column()
  public send_label: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
