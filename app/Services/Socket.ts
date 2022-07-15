import SocketChat from 'App/Models/SocketChat'
import SocketFriend from 'App/Models/SocketFriend'
import SocketUser from 'App/Models/SocketUser'
import SocketUserState from 'App/Models/SocketUserState'

class SocketsController {
  async saveChat(data) {
    await SocketChat.create(data)
  }
  async saveUser(data) {
    return await SocketUser.create(data)
  }
  async findUser(id) {
    var data = await SocketUser.query().where('id', id)
    var newData = data.map((item) => item.toJSON())
    return newData;
  }

  async getMsgs(query) {
    // await SocketChat.create(data)
    // console.log('query', query)
    var newData = await SocketChat.query().whereIn('from', [query.from, query.to]).andWhereIn('to', [query.from, query.to]);
    var data = newData.map((item) => item.toJSON())
    for(var i = 0; i < data.length; i++) {
      if(data[i].from == query.from){
        data[i].flow = 'out'
      } else {
        data[i].flow = 'in'
      }
    }
    return data;
  }
  async getFriend(data) {
    // console.log(data)
    var friendsArr =  await SocketFriend.query().where('friend_1', data.account);
    var arr = friendsArr.map(item => item.toJSON())
    for (var i = 0; i < arr.length; i++) {
      var socket_user = await SocketUser.findBy('id', arr[i].friend_2)
      var orderJson = socket_user.toJSON()

      var query = {
        from: arr[i].friend_1,
        to: arr[i].friend_2
      }
      var msgs = await this.getMsgs(query);
      var lastMsg =  msgs[msgs.length - 1]
      arr[i].lastMsg = lastMsg

      arr[i] = Object.assign({}, arr[i], orderJson)
    }
    return arr;
  }

  async addFriend(data) {
    var res = await SocketFriend.query().where('friend_1', data.friend_1).andWhere('friend_2', data.friend_2);
    if (res.length) {
      return;
    } else {
      return await SocketFriend.create(data);
    }
  }
}

export default new SocketsController();