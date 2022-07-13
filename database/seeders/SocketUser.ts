import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import SocketUser from 'App/Models/SocketUser'

export default class SocketUserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await SocketUser.createMany([
      {
        'socket_nick': 'nick_1',
        'socket_avatar': '2',
        'level': '2',
        'time': '1000',
        'ban': '1',
      },
      {
        'socket_nick': 'nick_2',
        'socket_avatar': '2',
        'level': '2',
        'time': '1000',
        'ban': '1',
      },
    ])
  }
}
