const Room = require('../models/room'); 

module.exports.GET_Home = (req, res, next) => {
    return res.render('home', {page_title : "Home"});
};

module.exports.GET_Log_Out = (req, res, next) => {
    if (req.logged_in) 
    {
        req.session.user_id = undefined;
        req.info = "You have logged out successfully.";
        res.locals.logged_in = false;
        return next();
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
}; 

module.exports.GET_Profile = (req, res, next) => {
    if(req.logged_in) 
    {
        return res.render('profile', {page_title : "Profile"});
    }
    else
    {
        return next();
    }
}; 

module.exports.GET_Rooms = (req, res, next) => {
    if(req.logged_in)
    {
        Room.findAll((rooms) => {
            res.render('rooms', {page_title : 'Rooms', rooms : rooms});
        });
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};

module.exports.GET_Chat_Server = (req, res, next) => {
    const room_id = req.params.id;
    res.render('chat_server', {page_title : "Chat", room_id : room_id});
};