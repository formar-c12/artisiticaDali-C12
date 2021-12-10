const { products, writeProductsJSON, categories } = require('../database/dataBase')

let subcategories = products.map(product => product.subcategory)
let uniqueSubcategories = subcategories.filter((x, i, a) => a.indexOf(x) == i)

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
       res.render('admin/products/adminProductCreateForm', {
           categories,
           subcategories: uniqueSubcategories
       })
    },
    store: (req, res) => {
        let lastId = 1;

        products.forEach(product => {
            if(product.id > lastId){
                lastId = product.id
            }
        });

        const {name, price, category, subcategory, description, discount} = req.body

        let newProduct = {
            id: lastId + 1,
            name: name.trim(),
            price: +price.trim(),
            category: +category,
            subcategory,
            description: description.trim(),
            discount: +discount,
            image: req.file ? [req.file.filename] : ["default-image.png"]
        }

        /* let newProduct = {
            ...req.body,
            id: lastId + 1,
            image: req.file ? req.file.filename : "default-image.png"
        } */

        products.push(newProduct)

        writeProductsJSON(products)

        res.redirect('/admin/products')
    },
    edit: (req, res) => {
        let productId = +req.params.id 
       res.render('admin/products/adminProductEditForm')
    },
    update: (req, res) => {

    },
    destroy: (req, res) => {

    }
}

module.exports = controller