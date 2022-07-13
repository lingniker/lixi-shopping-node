import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import SocketChat from 'App/Models/SocketChat'

export default class SocketChatSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SocketChat.createMany([
      {
        'from': '1',
        'to': '2',
        'text': '测试',
        'type': 'text',
        'unread': '1',
      },
      {
        'from': '1',
        'to': '2',
        'text': '测试',
        'type': 'text',
        'unread': '1',
      }
    ])
  }
}
