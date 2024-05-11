const variables = require("./variables"); 

// Modules
const express = require("express");
const body_parser = require('body-parser');
const session = require('express-session');
const FileStore = require("session-file-store")(session);
const path = require("path");
const http = require("http");
const socket_io = require("socket.io");


// Routes 
const auth_router = require("./routes/auth");
const user_router = require("./routes/user");

// Controllers
const main_controller = require("./controllers/main"); 
const console_controller = require("./controllers/console"); 

// Connections
const app = express();
const store = new FileStore({
    path : path.join(variables.database_path, "sessions")
});
const server = http.Server(app); 
const io = socket_io(server); 


// Settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Using the modules
app.use(body_parser.urlencoded({extended : false}));
app.use(express.static(path.join(variables.main_dir, "public")));
app.use(session({
    store: store,
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
})); 

/* Start handling */
app.use(console_controller.LOG_Request);
app.use(main_controller.SET_Request_User);

app.use(auth_router);
app.use(user_router);

app.use(main_controller.SEND_Info);
app.use(console_controller.LOG_Error);
app.use(main_controller.SEND_Error_Page); 
/* End handling */ 

/* Chat Server */
io.on('connection', (socket) => {
  console.log('A user connected');

  // Joining a room
  socket.on('joinRoom', ({ room, publicKey, username }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    // Generate session key for the room if not already generated
    if (!rooms[room]) {
      rooms[room] = Math.floor(Math.random() * 26) + 1; // Random number between 1 and 26
    }

    // Encrypt session key with user's public key
    const rsaKey = new NodeRSA();
    rsaKey.importKey(publicKey, 'pkcs8-public');
    const encryptedSessionKey = rsaKey.encrypt(rooms[room].toString(), 'base64');

    // Send encrypted session key to the user
    io.to(socket.id).emit('encryptedSessionKey', encryptedSessionKey);
  });

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(
    variables.port, 
    variables.hostname, 
    function(result)
    {
        console.log(`\nServer successfully started at http://${variables.hostname}:${variables.port}\n`);
    }
);
 
module.exports = server; 