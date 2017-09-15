var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');
var server = app.listen(8000);
var io = socket(server);
var ent = require('ent');



app.use(express.static('public'));
console.log('hello')

io.on('connection', function(socket){
  console.log('User as connected !');
  socket.on('disconnect', function(){
    console.log('User as diconnected !')
  })

  socket.on('message-send', function(msg){
    msg = ent.encode(msg);
      io.emit('message', msg)
    })
})
