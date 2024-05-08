const User = require('../models/user'); 

module.exports.SEND_Info = (req, res, next) => {
    if(req.info)
    {
        res.send(`<h1>INFO</h1> ${req.info} <br> <a href="/">Home</a>`);
    }
    else
    {
        return next();
    }
}

module.exports.SEND_Error_Page = (req, res, next) => {

    if(req.error_message)
    {
        res.send(`<h1>ERROR</h1> ${req.error_message} <br> <a href="/">Home</a>`);
    }
    else 
    {
        res.status(404).send(`<h1>ERROR</h1> 404 Not Found <br> <a href="/">Home</a>`);
    }
};

module.exports.SET_Request_User = (req, res, next) => {
    if(req.session.user_id)
    {
        User.findObjectById(req.session.user_id, (user) => {
            req.user = user; 
            req.logged_in = true;
            res.locals.logged_in = true;
            res.locals.user = user; 
            return next();
        }); 
    }
    else 
    {
        res.locals.logged_in = false;
        req.logged_in = false;
        return next();
    }
};

