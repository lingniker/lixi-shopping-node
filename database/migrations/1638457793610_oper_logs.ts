import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OperLogs extends BaseSchema {
  protected tableName = 'oper_logs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.string('user_name', 80).notNullable()
      table.string('ip', 80).notNullable()
      table.string('oper_massage', 80).notNullable()
      table.string('login_type', 180).notNullable()
      table.string('browser_type', 80).notNullable()
      table.string('system', 80).notNullable()
      table.string('query', 180).notNullable()
      table.string('response', 2080).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
