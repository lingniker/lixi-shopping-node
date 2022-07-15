import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocketFriends extends BaseSchema {
  protected tableName = 'socket_friends'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('friend_1', 180).notNullable() // 好友1
      table.integer('friend_2')
        .unsigned()
        .references('socket_users.id')
        .onDelete('CASCADE')  // 好友2
      table.string('black', 2).notNullable() // 黑名单 1黑名单, 2为非黑名单
      table.string('blacklisted', 2).notNullable() // 被黑名单 1黑名单, 2为非黑名单
      table.string('contact', 2).notNullable()  // 联系 1正常, 2被删除了
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
