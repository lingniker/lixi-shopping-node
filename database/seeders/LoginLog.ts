import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import LoginLog from 'App/Models/LoginLog'

export default class LoginLogSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await LoginLog.createMany([
      {
        'user_name': 'admin1',
        'ip': 'admin1',
        'login_massage': '123',
        'login_type': 'outlook',
        'browser_type': '--',
        'system': '123456'
        'query': '123456'
      },
      {
        'user_name': 'admin1',
        'ip': 'admin1',
        'login_massage': '123',
        'login_type': 'outlook',
        'browser_type': '--',
        'system': '123456'
        'query': '123456'
      }
    ])
  }
}
