class Users {
    constructor() {
        this.connectedUsers = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.connectedUsers.push(user);

        return this.connectedUsers;
    }

    getUser(id) {
        let user = this.connectedUsers.filter(findUser => findUser.id === id)[0];

        return user;
    }

    getAllUsers() {
        return this.connectedUsers;
    }


    getUsersRoom(room) {
        let usersroom = this.connectedUsers.filter(users => users.room === room);
        return usersroom;
    }

    deleteUser(id) {
        let deletedUser = this.getUser(id);
        this.connectedUsers = this.connectedUsers.filter(user => user.id != id);

        return deletedUser;
    }

}

module.exports = {
    Users
}