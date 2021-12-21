let { products, writeProductsJSON, categories } = require('../database/dataBase')
let fs = require('fs')
let subcategories = products.map(product => product.subcategory)
let uniqueSubcategories = subcategories.filter((x, i, a) => a.indexOf(x) == i)
let { validationResult } = require('express-validator')

let controller = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            session: req.session
        })
    },
    products: (req, res) => {
        res.render('admin/products/adminProducts', {
            products,
            session: req.session
        })
    },
    create: (req, res) => {
       res.render('admin/products/adminProductCreateForm', {
           categories,
           subcategories: uniqueSubcategories,
           session: req.session
       })
    },
    store: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
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
        } else {
            res.render('admin/products/adminProductCreateForm', {
                categories,
                subcategories: uniqueSubcategories,
                errors: errors.mapped(),
                old: req.body,
                session: req.session

            })
        }
    },
    edit: (req, res) => {
        let productId = +req.params.id;
        
        let product = products.find(product => product.id === productId)
        res.render('admin/products/adminProductEditForm', {
            product,
            categories, 
            subcategories: uniqueSubcategories,
            session: req.session
        })
    },
    update: (req, res) => {
        let productId = +req.params.id;

        const {name, price, category, subcategory, description, discount} = req.body

        products.forEach(product => {
            if(product.id === productId){
                product.id = product.id,
                product.name = name.trim(),
                product.price = +price.trim(),
                product.category = +category,
                product.subcategory = subcategory,
                product.description = description.trim(),
                product.discount = +discount,
                product.image = req.file ? [req.file.filename] : product.image
            }
        })

        writeProductsJSON(products)

        res.redirect('/admin/products')
    },
    destroy: (req, res) => {
        let productId = +req.params.id;

		products.forEach(product => {
			if(product.id === productId){
				if(fs.existsSync("./public/images/productos/", product.image[0])){
					fs.unlinkSync(`./public/images/productos/${product.image[0]}`)
				}else{
					console.log('No encontré el archivo')
				}

				let productToDestroyIndex = products.indexOf(product) // si lo encuentra devuelve el indice si no -1
				if(productToDestroyIndex !== -1) {
					products.splice(productToDestroyIndex, 1)
				}else{  // primer parámetro es el indice del elemento a borrar, el segundo, la cantidad a eliminar 
					console.log('No encontré el producto')
				}
			}
		})

		writeProductsJSON(products)
		res.redirect('/admin/products')
    }
}

module.exports = controller