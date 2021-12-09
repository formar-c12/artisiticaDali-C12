let express = require('express');
let router = express.Router();
let controller = require('../controllers/usersController');

/* GET - Show login form */
router.get('/login', controller.login)

/* GET - Show register form */
router.get('/register', controller.register)


module.exports = router