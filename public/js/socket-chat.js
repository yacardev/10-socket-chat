var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('username') || !params.has('chatroom')) {
    window.location = 'index.html'
    throw new Error('No se especifio User Name o Chat Room');
}

var user = {
    username: params.get('username'),
    room: params.get('chatroom')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('chatEntry', user, function(resp) {
        //console.log('Users: ', resp);
        usersRender(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMsg', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMsg', function(msg) {

    //console.log('Servidor:', msg);
    msgRender(msg, false);
    scrollBottom()

});

// Escuchar entrada/salida chat
socket.on('usersList', function(resp) {
    usersRender(resp);
    //console.log(msg);

});

//Mensajes privados
socket.on('privateMsg', function(msg) {
    console.log('Mensaje: ', msg);
});