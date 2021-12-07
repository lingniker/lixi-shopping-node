import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('user_id', 80).notNullable()
      table.string('user_name', 80).notNullable()
      table.string('user_address_id', 80).notNullable()
      table.string('user_address_name', 80).notNullable()
      table.string('shop_id', 80).notNullable()
      table.string('shop_name', 80).notNullable()
      table.string('shop_img_path', 80).notNullable()
      table.string('shop_address_name', 80).notNullable()
      table.string('shop_address_id', 80).notNullable()
      table.string('shop_number', 80).notNullable()
      table.string('shop_price', 80).notNullable()
      table.string('shop_price_total', 80).notNullable()
      table.string('order_status', 80).notNullable() // 1待付款 2已付款 
      table.string('order_label', 80).notNullable() // 1待付款 2已付款 
      table.string('send_status', 80).notNullable() // 1待付款 2待发货 3待收货 4完成 
      table.string('send_label', 80).notNullable() // 1待付款 2待发货 3待收货 4完成 

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
