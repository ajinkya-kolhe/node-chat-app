
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//Old way
//console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

//Emit event
  socket.emit('newMessage', {
    from: 'Ronaldo',
    text: 'How are you?',
    createdAt: '123'
  });

socket.on('createMessage', (message) => {
  console.log('createMessage', message);
});

//Listen to Event
  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
});

server.listen(port, () => {
  console.log('Server is up on port 3000');
});
