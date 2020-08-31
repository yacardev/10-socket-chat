const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMsg } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('chatEntry', (data, callback) => {

        if (!data.username || !data.room) {
            return callback({
                error: true,
                msg: 'User Name and Chat room is required'
            });
        }

        client.join(data.room);

        users.addUser(client.id, data.username, data.room);

        client.broadcast.to(data.room).emit('usersList', users.getUsersRoom(data.room))

        callback(users.getUsersRoom(data.room));
    });

    client.on('createMsg', (data) => {
        let user = users.getUser(client.id);
        let msg = createMsg(user.name, data.msg);

        // console.log('msg:', msg);
        client.broadcast.to(user.room).emit('createMsg', msg);
    });

    client.on('disconnect', () => {
        let deleteUser = users.deleteUser(client.id);

        client.broadcast.to(deleteUser.room).emit('newMsg', createMsg('Admin', `${deleteUser.name} salió.`));
        client.broadcast.to(deleteUser.room).emit('usersList', users.getUsersRoom(deleteUser.room))
    });

    client.on('privateMsg', data => {
        let user = users.getUser(client.id);
        client.broadcast.to(data.userTo).emit('privateMsg', createMsg(user.name, data.msg));

    })

});