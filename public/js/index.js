var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Ronaldo',
    text: 'Hey. This is awesome.'
  });
});

socket.on('disconnect', function () {
  console.log('Disonnected from server');
});

socket.on('newMessage', function (newMessage) {
  console.log('newMessage', newMessage);
});
