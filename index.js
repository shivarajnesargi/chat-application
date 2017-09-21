var express = require('express');
var socket = require('socket.io');
var app = express();
const  PORT = 4000;

var server=app.listen(PORT,function(){
  console.log('Started listening on port: '+PORT);
});

app.use(express.static('public'));

var io =socket(server);

io.on('connection',function(socket){
  console.log('Connected to socket with id: '+socket.id);
  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(handle){
    socket.broadcast.emit('typing',handle);
  })
});
