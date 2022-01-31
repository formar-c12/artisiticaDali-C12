//let { products, writeProductsJSON, categories } = require('../database/dataBase')
//let fs = require('fs')
//let subcategories = products.map(product => product.subcategory)
//let uniqueSubcategories = subcategories.filter((x, i, a) => a.indexOf(x) == i)
let { validationResult } = require('express-validator')

const db = require('../database/models');

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const ProductImages = db.ProductImage;


let controller = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            session: req.session
        })
    },
    products: (req, res) => {
        Products.findAll()
        .then(products => {
            res.render('admin/products/adminProducts', {
                products,
                session: req.session
            })
        })
    },
    create: (req, res) => {
        let allCategories = Categories.findAll();
        let allSubcategories = Subcategories.findAll();
        Promise.all([allCategories, allSubcategories])
        .then(([categories, subcategories]) => {
            res.render('admin/products/adminProductCreateForm', {
                categories,
                subcategories,
                session: req.session
            })   
        })
    },
    store: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            const {name, price, category, subcategory, description, discount} = req.body
            Products.create({
                name,
                price,
                description,
                discount,
                subcategoryId: subcategory,
            })
            .then((product) => {
                ProductImages.create({
                    image: req.file ? req.file.filename : 'default-image.png',
                    productId: product.id
                })
                .then(() => {
                    res.redirect('/admin/products')
                })
            })
            .catch(error => console.log(error))
        } else {
            let allCategories = Categories.findAll();
            let allSubcategories = Subcategories.findAll();
            Promise.all([allCategories, allSubcategories])
            .then(([categories, subcategories]) => {
            res.render('admin/products/adminProductCreateForm', {
                categories,
                subcategories,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
                })
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