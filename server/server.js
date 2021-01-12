const express = require("express");
const passport = require('./passport/index.js');
const session = require('express-session');
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const routes = require('./routes');
// const formatMessage = require('./utils/messages');
// const { userJoin, getRoomUsers, getUser, userLeave } = require('./utils/users');
// const calendarRoutes = require('./routes/calendar');

const path = require('path');
// const users = require("./models/user");
require('./config/db')();

// PORT
const PORT = process.env.PORT || 8000;

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sessions
app.use(
  session({
    secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// routes
app.use(routes);
// app.use('/scheduler', calendarRoutes);
// require("./routes/user")(app);
// require("./routes/calendar")(app);


// const exApp = express();
// const server = http.createServer(exApp);

// const io = socketio(server);


// const peerServer = ExpressPeerServer(server, { debug: true });

// exApp.use('/peerjs', peerServer)

// set static folder
// exApp.use(express.static(path.join(__dirname, 'public')));

// const botName = 'Chat Bot';

// io.on('connection', socket => {
//   socket.on('join-room', ({ firstName, userName, facility }) => {
//     const user = userJoin(firstName, userName, facility);

//     socket.join(user.room);

//     socket.emit('message', formatMessage(botName, "Welcome to GetPetVet!"));
//     socket.emit('enter-room', user.room);

//     // Broadcast when  a user connects
//     socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat, be nice with him/her`));

//     // Send users and Room info
//     io.to(user.room).emit('room-users', {
//       room: user.room,
//       users: getRoomUsers(user.room)
//     });

//     // Listen for chatMessage
//     socket.on('user-message', msg => {
//       const user = getUser(id);
//       io.to(user.room).emit('message', formatMessage(user.username, msg));

//     });


//     // Runs when client disconnects
//     socket.on('disconnect', () => {
//       const user = userLeave(id);

//       if (user) {
//         io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

//         // Send users and room info
//         io.to(user.room).emit('room-users', {
//           room: user.room,
//           users: getRoomUsers(user.room)
//         });
//       }
//     });

//     // Listen to WebcamOn
//     socket.on('webcam-on', () => {
//       user.cam = true;
//       io.to(user.room).emit('add-webcam-icon', user.id);
//     });

//     // Listen to webcamOff
//     socket.on('webcam-off', () => {
//       user.cam = false;
//       io.to(user.room).emit('remove-webcam-icon-stream-called', user.id);
//     });
//   });

// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));

// sockets old SOCKET IS CLIENT, IO IS THE SERVER
const users = {};

io.on('connection', socket => {
  if (!users[socket.id]) {
    users[socket.id] = {
      id: socket.id,
    };
  }

  socket.emit("yourID", socket.id);

  io.sockets.emit("allUsers", users);
  console.log("ALL USERS SOCKET USERS" + users);

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log("DISCONNECT USERS" + users);
    console.log(users);
  });

  socket.on("join-room", (data) => {
    // socket.join(data.facility);
    console.log("SOCKET ROOM " + data);
    console.log("SOCKET ID " + socket.id);
    socket.to(data.facility).emit(socket.id);
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// // server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

server.listen(PORT, () => console.log('server is running on port ' + PORT));