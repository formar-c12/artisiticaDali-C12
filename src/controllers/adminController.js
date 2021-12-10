const { products, writeProductsJSON } = require('../database/dataBase')

let controller = {
    index: (req, res) => {
        res.render('admin/adminIndex')
    },
    products: (req, res) => {
        res.render('admin/products/adminProducts', {
            products
        })
    },
    create: (req, res) => {
       res.render('admin/products/adminProductCreateForm')
    },
    edit: (req, res) => {
       res.render('admin/products/adminProductEditForm')
    },
}

module.exports = controller