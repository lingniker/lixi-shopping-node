import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocketUsers extends BaseSchema {
  protected tableName = 'socket_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('socket_nick', 180).notNullable() // 昵称
      table.string('socket_avatar', 180).notNullable() // 头像
      table.string('level', 10).notNullable() // 级别
      table.string('time', 10).notNullable()  // 在线时长
      table.string('ban', 1).notNullable() // 1不被禁止 2被禁止

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
