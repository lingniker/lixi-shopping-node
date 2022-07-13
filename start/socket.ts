import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('login', (data) => {
    socket.emit('loginFeedback', {code: 200, msg: '成功'})
  })

})