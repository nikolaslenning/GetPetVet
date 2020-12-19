const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const routes = require('./routes');
const path = require('path');
require('./config/db')();

const PORT = process.env.PORT || 8000;

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const users = {};

io.on('connection', socket => {
    if (!users[socket.id]) {
        users[socket.id] = {
            id: socket.id,
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


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// app.listen(PORT, () => {
//   console.log('app running on PORT: ' + PORT);
// });

server.listen(PORT, () => console.log('server is running on port ' + PORT));


