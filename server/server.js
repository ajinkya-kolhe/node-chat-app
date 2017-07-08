
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//Old way
//console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./util/message');

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //socket Emit event to single connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

  //socket broadcast emits evetn to all connection except current one
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    //IO emits events to all connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the Server.');
  });

//Listen to Event
  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
});

server.listen(port, () => {
  console.log('Server is up on port 3000');
});
