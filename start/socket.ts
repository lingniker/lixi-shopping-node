import Ws from 'App/Services/Ws'
import SocketsController from 'App/Services/socket'

Ws.boot()

var socketMap = {}
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('login', (data) => {
    socket.emit('loginFeedback', {
      code: 200, 
      msg: '登录成功',
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
  })

  socket.on('sayto', (data) => {
    var obj = {
      from: data.from,
      to: data.to,
      type: 'text',
      text: data.text,
      unread: '1',
    }
    // console.log('obj-', obj)
    SocketsController.saveChat(obj)
  })

  socket.on('getMsgs', (data) => {
    socket.emit('getMsgsFeedback', [data])
  })

})