/*
  script de configuration serveur
*/

//chargement des modules nodes dans des variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');
//lancement de l'ecoute serveur
var server = app.listen(8000);
var io = socket(server);
var ent = require('ent');
//definition d'un dossier accessible pour le navigateur
app.use(express.static('public'));

//déclaration de l'attente d'un evennement connection
io.on('connection', function(socket){
  //creation d'une variable pour stocker le pseudo
  var loggedUser;
  console.log('User is connected !');
  socket.on('disconnect', function(){
    console.log('User is disconnected !');
  });
  // attente de l'evenement login pour recup le login de l'utilisateur
  socket.on('login', function(user){
    loggedUser = ent.encode(user);
    //envoi de la notification de connection aux autres utilisateurs
    socket.broadcast.emit('service-message', loggedUser)
  })

  //attente de l'evenement message-send depuis les utilisateurs
  socket.on('message-send', function(msg){
    //envoi du message a tout les utilisateurs
    io.emit('message', {message: ent.encode(msg), user: loggedUser})
  })
})
