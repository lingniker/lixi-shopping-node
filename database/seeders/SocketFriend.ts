import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import SocketFriend from 'App/Models/SocketFriend'

export default class SocketFriendSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SocketFriend.createMany([
      {
        'friend_1': '1',
        'friend_2': '2',
        'black': '2',
        'blacklisted': '2',
        'contact': '1',
      },
      {
        'friend_1': '2',
        'friend_2': '1',
        'black': '2',
        'blacklisted': '2',
        'contact': '1',
      },
    ])
  }
}
