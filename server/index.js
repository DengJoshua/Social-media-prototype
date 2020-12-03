const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const socketio = require('socket.io')

// connect to database
mongoose.connect('mongodb://localhost/social_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
})
    .then(() => console.log('Successfully connected to database'))
    .catch((err) => console.log('Could not connect to database', err))


const server = http.createServer(app)

// connect sockcet io
const io = socketio(server)


exports.io = io

app.use(express.json())
app.use(cors())

// applying apis

// search api
app.use('/api/search', require('./routes/search'))

// posts api
app.use('/api/posts', require('./routes/posts'))

// users api
app.use('/api/users', require('./routes/users'))

// login api
app.use('/api/auth', require('./routes/auth'))

// friends and messages api
app.use('/api/friends', require('./routes/friends'))

// connect tunnel
server.listen(port, () => console.log(`Listening on port ${port}`))
