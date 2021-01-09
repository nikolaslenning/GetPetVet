let users = [];

// join user to chat
function userJoin(id, username, room){
    const user = {id, username, room, cam: false};

    users.push(user);

    return user;
}

// Get Room Users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

// Get user
function getUser(id){
    return users.find(user => user.id === id);
}

// User leaves Chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}


module.exports = {
    userJoin,
    getRoomUsers,
    getUser,
    userLeave
};