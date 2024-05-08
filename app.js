const variables = require("./variables"); 

// Modules
const express = require("express");
const body_parser = require('body-parser');
const session = require('express-session');
const FileStore = require("session-file-store")(session);
const path = require("path");


// Routes 
const auth_router = require("./routes/auth");
const user_router = require("./routes/user");

// Controllers
const main_controller = require("./controllers/main"); 
const console_controller = require("./controllers/console"); 

const app = express();
const store = new FileStore({
    path : path.join(variables.database_path, "sessions")
});

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

app.listen(
    variables.port, 
    variables.hostname, 
    function(result)
    {
        console.log(`\n\nServer successfully started at http://${variables.hostname}:${variables.port}\n`);
    }
);