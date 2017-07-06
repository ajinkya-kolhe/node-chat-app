
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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app.',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined.',
    createdAt: new Date().getTime()
  });

//socket Emit event to single connection

socket.on('createMessage', (message) => {
  console.log('createMessage', message);
  //IO emits events to all connection
  io.emit('newMessage', {
    from: message.from,
    text: message.text,
    createdAt: new Date().getTime()
  });
//socket broadcast emits evetn to all connection except current one
  // socket.broadcast.emit('newMessage', {
  //    from: message.from,
  //    text: message.text,
  //    createdAt: new Date().getTime()
  //  });
});

//Listen to Event
  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
});

server.listen(port, () => {
  console.log('Server is up on port 3000');
});
