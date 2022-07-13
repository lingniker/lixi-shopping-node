// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SocketChat from 'App/Models/SocketChat'
import SocketFriend from 'App/Models/SocketFriend'
import SocketUser from 'App/Models/SocketUser'
import SocketUserState from 'App/Models/SocketUserState'

export default class SocketsController {
  async saveChat ({ request, response }) {
    var obj = {
      from: '',
      to: '',
      type: 'text',
      text: 'text'
    }
    await SocketChat.create(obj)
  }
}
