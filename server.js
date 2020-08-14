const io = require('socket.io')(3000)

const users ={}

io.on('connection', socket =>{
    socket.on('new-user', this_name =>{
        users[socket.id] = this_name
        socket.broadcast.emit('user-connected', this_name)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',
        {message: message,
        name : users[socket.id] })
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-dissconnected', users[socket.id])
        delete users[socket.id]
    })
})