const createMsg = (user, msg) => {
    return {
        user,
        msg,
        date: new Date().getTime()
    };
}

module.exports = {
    createMsg
}