import SocketChat from 'App/Models/SocketChat'
import SocketFriend from 'App/Models/SocketFriend'
import SocketUser from 'App/Models/SocketUser'
import SocketUserState from 'App/Models/SocketUserState'

class SocketsController {
  async saveChat(data) {
    await SocketChat.create(data)
  }
  async getMsgs() {
    // await SocketChat.create(data)
  }
}

export default new SocketsController();