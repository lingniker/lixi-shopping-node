import Ws from 'App/Services/Ws'
import SocketsController from 'App/Services/socket'

Ws.boot()

var socketMap = {}
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('login', async(data) => {
    var res = await SocketsController.findUser(data.account);
    if (res.length) {
      socket['account'] = data.account;
      socketMap[socket.id] = socket;
      socket.emit('loginFb', {
        code: 200, 
        msg: '登录成功',
        socket_id: data.account + "_" + socket.id,
        account : data.account,
        friends: [
          {
            socket_nick: 'nick2',
            socket_avatar: 'https://img1.baidu.com/it/u=2410334281,3176912851&fm=253&fmt=auto&app=138&f=JPEG?w=511&h=500',
            unread: '0',
            time: 1231,
            lastMsg: {
              from: '2',
              to: '1',
              time: 1231,
              type: 'text',
              text: '123456'
            }
          }
        ]
      })
    } else {
      socket.emit('loginFb', {
        code: 20001, 
        msg: '没有账号',
      })
    }
  })

  socket.on('sayto', (data) => {
    var obj = {
      from: data.from,
      to: data.to,
      type: 'text',
      text: data.text,
      unread: '1',
    }
    var fbObj = {
      from: data.from,
      to: data.to,
      type: 'text',
      text: data.text,
      unread: '1',
      flow: 'out'
    }
    // console.log('obj-', obj)
    socket.emit('saytoFb', fbObj);

    for (var key in socketMap) {
      if(socketMap[key].account == data.to) {
        fbObj.flow = 'in'
        socketMap[key].emit('onmsg', fbObj)
      }
    }

    SocketsController.saveChat(obj)
  })

  socket.on('getMsgs', async(data) => {
    console.log("data----------------->", data, socket.account)
    var query = {
      from: socket['account'],
      to: data.account
    }
    var res = await SocketsController.getMsgs(query)
    socket.emit('getMsgsFb', res)
  })

  socket.on('getFriends', async(data)=>{
    var res = await SocketsController.getFriend(data)
    socket.emit('getFriendsFb', res)
  })

  socket.on('sginup', async(data)=>{
    // pass: data.pass,
    var obj = {
      socket_nick: data.nick,
      socket_avatar: "https://img1.baidu.com/it/u=2410334281,3176912851&fm=253&fmt=auto&app=138&f=JPEG?w=511&h=500",
      level: '1',
      time: '0',
      ban: '1'
    }
    var res = await SocketsController.saveUser(obj)
    console.log('res', res);
    socket.emit('onsginup', res)
  })

  socket.on('finduser', async(data)=>{
    var res = await SocketsController.findUser(data);
    socket.emit('onfinduser', res)
  })

  socket.on('addfriend', async(data)=>{
    var obj = {
      'friend_1': data.id,
      'friend_2': socket['account'],
      'black': '2',
      'blacklisted': '2',
      'contact': '1',
    }
    var obj1 = {
      'friend_1': socket['account'],
      'friend_2': data.id,
      'black': '2',
      'blacklisted': '2',
      'contact': '1',
    }
    await SocketsController.addFriend(obj);
    await SocketsController.addFriend(obj1);
    socket.emit('onaddfriend', { account: socket['account'] });
  })
})