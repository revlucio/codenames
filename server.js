var express = require('express');
var socketIO = require('socket.io');

const PORT = process.env.PORT ||3000;
const server = express()
  .use((req, res) => res.sendFile(__dirname + '/index.html') )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});
