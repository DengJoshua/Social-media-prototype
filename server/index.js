const socketio = require('socket.io')
const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const moment = require('moment')
const { getUser, addUser, removeUser} = require('./routes/sockets')

let socketID = ""
var users = []

mongoose.connect('mongodb://localhost/social_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
})
    .then(() => console.log('Successfully connected to database'))
    .catch((err) => console.log('Could not connect to database', err))


const server = http.createServer(app)
const io = socketio(server)

function formatMessage(message, user) {
    return {
        user: user.name,
        message,
        time: moment().format('h:mm a')
    };
}

io.on('connection', (socket) => {
    console.log("user connected.", socket.id)
    socketID = socket.id
})


app.use(express.json())
app.use(cors())

app.use('/api/search', require('./routes/search'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/friends', require('./routes/friends'))


server.listen(port, () => console.log(`Listening on port ${port}`))
