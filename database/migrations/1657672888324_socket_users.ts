import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocketUsers extends BaseSchema {
  protected tableName = 'socket_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

       table.string('socket_name', 80).notNullable() // 名称
       table.string('socket_nick', 180).notNullable() // 昵称
       table.string('level', 10).notNullable() // 级别

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
