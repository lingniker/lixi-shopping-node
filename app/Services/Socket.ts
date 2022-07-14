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
    var data = await SocketChat.query().whereIn('from', ['1','2']).andWhereIn('to', ['1', '2']);
    data = data.map((item) => item.toJSON())
    for(var i = 0; i < data.length; i++) {
      if(data[i].from == '1'){
        data[i].flow = 'out'
      } else {
        data[i].flow = 'in'
      }
    }
    return data;
  }
}

export default new SocketsController();