import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        'username': 'ling1',
        'nickname': 'niker1',
        'mobile': '1231',
        'email': 'outlook1',
        'avatar': '--',
        'password': '123456'
      },
      {
        'username': 'ling',
        'nickname': 'niker',
        'mobile': '123',
        'email': 'outlook',
        'avatar': '--',
        'password': '123456'
      }
    ])
  }
}
