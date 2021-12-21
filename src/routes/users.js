let express = require('express');
let router = express.Router();
let controller = require('../controllers/usersController');
let loginValidator = require('../validations/loginValidator')
let registerValidator = require('../validations/registerValidator')
let uploadFile = require('../middlewares/uploadAvatar')

/* GET - Show login form */
router.get('/login', controller.login)
/* POST - Login Data */
router.post('/login', loginValidator ,controller.processLogin)

/* GET - Show register form */
router.get('/register', controller.register)
/* POST - Register Data */
router.post('/register', uploadFile.single('avatar'),registerValidator, controller.processRegister)

/* GEt - Logout*/
router.get('/logout', controller.logout)

/* GET - User profile */
router.get('/profile', controller.profile)


module.exports = router