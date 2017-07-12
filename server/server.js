
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//Old way
//console.log(__dirname + '/../public');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./util/message');
const {isRealString} = require('./util/validation');
const {Users} = require('./util/users');

var app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    // socket.leave('');

    // io.emit --> io.to('').emit
    // socket.broadcast.emit --> socket.broadcast.to('').emit
    // socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket Emit event to single connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

    //socket broadcast emits evetn to all connection except current one
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      //IO emits events to all connection
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

socket.on('createLocationMessage', (coords) => {
  var user = users.getUser(socket.id);
  if (user) {
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  }
});
//Listen to Event
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
});

server.listen(port, () => {
  console.log('Server is up on port 3000');
});
