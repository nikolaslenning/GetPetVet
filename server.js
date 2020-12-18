const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on('connection', socket => {
    if (!users[socket.id]) {
        users[socket.id] = {
            id: socket.id,
            name: "Zach"
        };
    }

    socket.emit("yourID", socket.id);

    io.sockets.emit("allUsers", users);
    console.log(users)

    socket.on('disconnect', () => {
        delete users[socket.id];
    })
    
    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })
    
    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })

    socket.on('nameSelf', (data) => {
        const id = data.id;
        
        if (users[id]) {
            users[id].username = data.username;
            io.to(id).emit('success', {});
        } else {
            io.to(id).emit('invalid', { errors: ['Invalid name'] });
        }
    })
});

server.listen(8000, () => console.log('server is running on port 8000'));


