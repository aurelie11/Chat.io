(function(){
  // creation de la socket client
  var socket = io();
  //creation du callback du submit de message valider
  $("#chat").submit(function(e){
    //annule le comportement par defaut de la validation de formulaire
    e.preventDefault()
    var message = $('#chat-text')
    // envoi du message au serveur et clear de l'imput
    socket.emit('message-send', message.val())
    message.val('');
  });
  // attente de l'evenement message du serveur
  socket.on('message', function(msg){
    //affichage du pseudo + message sur la page
    $("#chat-body").append('<li>'+ msg.user +': '+msg.message+'</li>')
  });
  // attente de l'event service message qui previen d'une connection utilisateur
  socket.on('service-message', function(user){
    $("#chat-body").append('<li>'+user+' is connected </li>')
  })
  //creation du callback de validation de login
  $("#login").submit(function(e){
    //annule le comportement par defaut de la validation du formulaire
    e.preventDefault();
    var username = $('#username')
    //envoi du pseudo au serveur et clear de l'input
    socket.emit('login', username.val())
    username.val('')
    //cache le formulaire de connection et affiche le formulaire de message a l'aide d'une classe
    $('#chat').removeClass()
    $('#login').addClass('hidden')
  })

})()
