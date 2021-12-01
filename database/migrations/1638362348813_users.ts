import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('user_name', 80).notNullable().unique()
      table.string('nick_name', 80).notNullable().unique()
      table.string('mobile', 80).unique().nullable()
      table.string('email', 80).notNullable().unique()
      table.string('avatar', 254).nullable()
      table.string('password', 60).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
