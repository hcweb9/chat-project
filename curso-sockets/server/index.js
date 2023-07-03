//Cargar módulos y librerías

//const exp = require('constants');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io') (server,  {
    cors: {
      origin: '*',
  	  }
    });

//Cargar una vista estática por defecto, un middelware de express

app.use(express.static('client'));
//Todos los html que haya en la carpeta client van a ser los estáticos
//osea que se carguen todos los html dentro de la carpeta client.


//Crear Rutas de prueba

app.get('/home', function(req, res){

res.status(200).send('Hello from home!!!');

});

/*Enviar un mensaje desde el socket al cliente por defecto de que está conectado, 
en un aray en objetos JSON*/

var messages = [{
id: 1,
text: "Welcome to the Socket.io and NodeJS private chat of Hernán Casaoliva...",
nickname: "Bot - Hernán"
}];


//Abrir una conección al socket, permite notificar por consola que alguien se ha conectado .

io.on('connection', function(socket){

console.log("The client with IP: "+socket.handshake.address+"  is connected...");

//Emitir array de mensajes al client

socket.emit('messages', messages);

//recoger el evento addMessage en el servidor
socket.on('add-message', function(data){
  messages.push(data); //push es para agregar un dato a ese array(messages) y q se guarde.

  //Emitir los mensajes de nuevo a todos los clientes, osea el array de nuevo actualizado
  io.sockets.emit('messages', messages);

});

});

//Crear Servidor con express

server.listen(6677, function(){

console.log('The server is running on http://localhost:6677');

});

