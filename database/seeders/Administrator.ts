import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Administrator from 'App/Models/Administrator'

export default class AdministratorSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Administrator.createMany([
      {
        'user_name': 'admin',
        'nick_name': 'admin',
        'mobile': '1231',
        'email': 'outlook1',
        'avatar': '--',
        'password': '123456'
      },
      {
        'user_name': 'admin1',
        'nick_name': 'admin1',
        'mobile': '123',
        'email': 'outlook',
        'avatar': '--',
        'password': '123456'
      }
    ])
  }
}
