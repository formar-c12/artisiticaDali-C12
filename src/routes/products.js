let express = require('express')
let router = express.Router()
let controller = require('../controllers/productsController')

router.get('/detail', controller.detail)

module.exports = router