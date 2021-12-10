let express = require('express');
let router = express.Router();
let controller = require('../controllers/adminController');

/* GET - Show products list */
router.get('/', controller.index)

/* GET - Show products list */
router.get('/products', controller.products)

/* GET - Show product create form */
router.get('/product/create', controller.create)

/* GET - Show product edit form */
router.get('/product/edit/:id', controller.edit)


module.exports = router