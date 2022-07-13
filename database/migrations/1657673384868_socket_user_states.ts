import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocketUserStates extends BaseSchema {
  protected tableName = 'socket_user_states'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('session_id', 180).notNullable() // 登录时创建的会话
      table.string('socket_id', 180).notNullable() // 用户id
      table.string('is_online', 2).notNullable()    // 在线状态 1在线 2不在线
      table.string('invalid', 2).notNullable()    // 无效链接 1无效 2有效

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
