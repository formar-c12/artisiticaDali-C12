let express = require('express');
let router = express.Router();
let controller = require('../controllers/usersController');
let loginValidator = require('../validations/loginValidator')

/* GET - Show login form */
router.get('/login', controller.login)
/* POST - Login Data */
router.post('/login', loginValidator ,controller.processLogin)

/* GET - Show register form */
router.get('/register', controller.register)
/* POST - Register Data */
router.post('/register', controller.processRegister)


module.exports = router