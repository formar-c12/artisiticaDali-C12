let express = require('express')
let router = express.Router()
let controller = require('../controllers/productsController')

/* GET - Product Detail */
router.get('/detail/:id', controller.detail)

/* GET - List of products */
router.get('/category/:id', controller.category)

module.exports = router