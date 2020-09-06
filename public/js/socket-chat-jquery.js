var params = new URLSearchParams(window.location.search);
//referencia jquery
var divUsuarios = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMsg = $('#txtMsg');
var username = params.get('username');
var room = params.get('chatroom');
var divChatbox = $('#divChatbox');

// funciones renderizar usuarios

function usersRender(users) { //[{},{},....{}]
    // console.log('jquery');
    // console.log(users);



    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('chatroom') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < users.length; i++) {

        html += '<li>';
        html += '    <a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}

function msgRender(msg, vIam) {
    //console.log('msgRender');
    //console.log(msg);
    var html = '';
    var date = new Date(msg.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    if (msg.user === 'Admin') {
        adminClass = 'danger';
        var adminBool = true;
    } else {
        var adminBool = false;
    }

    if (vIam) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.user + '</h5>';
        html += '        <div class="box bg-light-inverse">' + msg.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } else {

        html += '<li class="animate fadeIn">';
        if (!adminBool) html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.user + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + msg.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }





    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners jquery
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) console.log(id);
})

sendForm.on('submit', function(event) {
    event.preventDefault();
    if (txtMsg.val().trim().length === 0) {
        return;
    }
    // console.log(txtMsg.val());
    // Enviar información
    socket.emit('createMsg', {
        username,
        msg: txtMsg.val()
    }, function(resp) {
        //console.log('respuesta server: ', resp);
        txtMsg.val('').focus();
        msgRender(resp, true);
        scrollBottom();
    });
})