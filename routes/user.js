const router = require("express").Router(); 

const user_controller = require("../controllers/user"); 

router.get('/', user_controller.GET_Home);
router.get('/profile', user_controller.GET_Profile);
router.get('/logout', user_controller.GET_Log_Out);

router.get('/chatserver/:id', user_controller.GET_Chat_Server);

module.exports = router;