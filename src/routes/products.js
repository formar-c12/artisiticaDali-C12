let express = require('express')
let router = express.Router()
let controller = require('../controllers/productsController')

/* GET - Product Detail */
router.get('/detail/:id', controller.detail)

/* GET - List of products */
router.get('/category/:id', controller.category)

/* GET - List of product (Subcategories) */
router.get('/subcategory/:subcategory/:categoryId', controller.subcategory)

/* GET - Search products */
router.get('/search', controller.search)

module.exports = router