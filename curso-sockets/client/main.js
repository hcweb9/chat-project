
/*-Para que el cliente se pueda conectar a nuestro socket, y que le llegue un msg por default al cliente,
de que el cliente se ha conectado y que el socket detecte de que alguien se a conectado a la app
  -Se agrega el IP de seguido del puerto 6677, se busca el IP desde el cmd haciendo ipconfig
  Esa es la dirección a la cual se va a conectar el cliente, desde distintos dispositivos.
  Esa es la URL del socket.
*/
var socket = io.connect('http://192.168.1.40:6677', {'forceNew': true});

//Para que el cliente reciba la emisión del array de mensajes

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

//Para que aparezca el array de mensajes que llegan desede el servidor/sockect al HTML

function render(data){
    var html = data.map(function(message, index){

    return(`<div class= "message">
            <strong>${message.nickname}</strong> says:
            <p>${message.text}</p>
        </div>
        `);
    }).join(' ');

    var div_msg = document.getElementById('messages');
    div_msg.innerHTML = html; //Para que se agreguen los mensajes al HTML
    div_msg.scrollTop = div_msg.scrollHeight;//Para que el scroll se quede abajo en el último msj

}

//Para recibir el evento addMessage osea el msj desde el form, crear la función addMessage
//Se define un objeto que se envia al servidor para que el socket lo guarde.

function addMessage(e){
    
    var message ={
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,

    };    

    document.getElementById('nickname').style.display = 'none';//para no poder cambiar el nickname

    
    //Emitir un evento del cliente al servidor osea socket, se pasa el msj para q se guarde en el servidor
    socket.emit('add-message', message);

    //Para que se borre el msj escrito del textarea al presionar send o enter y quede en blanco.
    document.getElementById('text').value = '';

    return false;  //para que corte la ejecución de la función
   
 
}


//Tecla Enter para submit (Lo cree yo)
/*var input = document.getElementById("myForm");

input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("send").click();
        }
    });*/

function pulsar(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("send").click();
    }
}