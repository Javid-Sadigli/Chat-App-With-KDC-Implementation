const router = require("express").Router(); 

const user_controller = require("../controllers/user"); 

router.get('/', user_controller.GET_Home);
router.get('/logout', user_controller.GET_Log_Out);

module.exports = router;