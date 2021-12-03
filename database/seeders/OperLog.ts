import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import OperLog from 'App/Models/OperLog'

export default class OperLogSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await OperLog.createMany([
      {
        'user_name': 'admin1',
        'ip': 'admin1',
        'oper_massage': '123',
        'login_type': 'outlook',
        'browser_type': '--',
        'system': '123456',
        'query': '123456',
        'response': '--'
      },
      {
        'user_name': 'admin1',
        'ip': 'admin1',
        'oper_massage': '123',
        'login_type': 'outlook',
        'browser_type': '--',
        'system': '123456',
        'query': '123456',
        'response': '--'
      }
    ])
  }
}
