import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        'user_name': 'ling1',
        'nick_name': 'niker1',
        'mobile': '1231',
        'email': 'outlook1',
        'avatar': 'ckwovbq2o00016ctoa5nt2nlq.jpg',
        'password': '123456',
        'money': '100000',
        'address_name': '深圳',
        'address_id': '1',

      },
      {
        'user_name': 'ling',
        'nick_name': 'niker',
        'mobile': '123',
        'email': 'outlook',
        'avatar': 'ckwovbq2o00016ctoa5nt2nlq.jpg',
        'password': '123456',
        'money': '100000',
        'address_name': '深圳',
        'address_id': '1',
      }
    ])
  }
}
