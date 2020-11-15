const socketio = require('socket.io')
const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const moment = require('moment')


mongoose.connect('mongodb://localhost/social_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
    })
    .then(() => console.log('Successfully connected to database'))
    .catch((err) => console.log('Could not connect to database', err))


const server = http.createServer(app)
const io = socketio(server)

function formatMessage(username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    };
}

io.on('connection', (socket) => {
    socket.on('join', ({ username, room}, callback) => {
        if(error) return callback(error)

        socket.join(user.room)
        io.to(user.room).emit('roomData', users)
        callback();
    })

    socket.on('sendMessage', ( message, callback ) => {
        io.to(user.room).emit('message', formatMessage(user.username, message))
        io.to(user.room).emit('roomData', users)
        callback()
    })
 
    
    socket.on('disconnect', () => {
        console.log('User has left room')
    })
})


app.use(express.json())
app.use(cors())

app.use('/api/search', require('./routes/search'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/friends', require('./routes/friends'))


server.listen(port, () => console.log(`Listening on port ${port}`))
