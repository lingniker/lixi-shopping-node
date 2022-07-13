import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import SocketUserState from 'App/Models/SocketUserState'


export default class SocketUserStateSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SocketUserState.createMany([
      {
        'session_id': 'a123456',
        'socket_id': '1',
        'is_online': '1',
        'invalid': '2'
      },
      {
        'session_id': 'a123457',
        'socket_id': '2',
        'is_online': '1',
        'invalid': '2'
      },
    ])
  }
}
