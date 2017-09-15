(function(){
  var socket = io();
  console.log('hello')
  $("#chat").submit(function(e){
    e.preventDefault()
    var message = $("#chat-text")

    socket.emit('message-send',
      message.val())

    message.val('');
  })

  socket.on('message', function(message){
    $('#message').append('<li>'+message+'</li>')
  })

})()

