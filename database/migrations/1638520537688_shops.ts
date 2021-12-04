import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shops extends BaseSchema {
  protected tableName = 'shops'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('shop_name', 80).notNullable()
      table.string('img_path', 180).notNullable()
      table.string('describe', 180).notNullable()
      table.string('shop_img_path', 180).notNullable()
      table.string('stock', 80).notNullable()
      table.string('sales_volume', 80).notNullable()
      table.string('sales_status', 80).notNullable() // 1在售  2下架  3售完
      table.string('sales_status_label', 180).notNullable()
      table.string('price', 80).notNullable()
      table.string('address_name', 80).notNullable()
      table.string('address_id', 80).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
