import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocketChats extends BaseSchema {
  protected tableName = 'socket_chats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('from', 180).notNullable() // 发送者
      table.string('to', 180).notNullable() // 接受者
      table.string('text', 1000).notNullable() // 文字
      table.string('type', 10).notNullable()  // type: 'text'
      table.string('unread', 1).notNullable() // 未读数 1已读， 2未读

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
