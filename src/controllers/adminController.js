//let { products, writeProductsJSON, categories } = require('../database/dataBase')
let fs = require('fs')
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
            .catch(error => console.log(error))
        }
    },
    edit: (req, res) => {
        const productPromise = Products.findByPk(req.params.id);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories])=>{
            res.render('admin/products/adminProductEditForm', {
                product,
                categories, 
                subcategories,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    },
    update: (req, res) => {
        const {name, price, category, subcategory, description, discount} = req.body
        Products.update({
            name, 
            price, 
            description,
            discount, 
            subcategoryId: subcategory,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            if(result){
                ProductImages.findAll({
                    where: {
                        productId: req.params.id
                    }
                })
                .then((images) => {
                    images.forEach((image) => {
                        fs.existsSync('./public/images/productos/', image.image)
                        ? fs.unlinkSync(`./public/images/productos/${image.image}`)
                        : console.log('No se encontró el archivo')
                    })
                    ProductImages.destroy({
                        where: {
                            productId: req.params.id
                        }
                    })
                    .then(() => {
                        ProductImages.create({
                            image: req.file ? req.file.filename : 'default-image.png',
                            productId: req.params.id
                        })
                        .then(() => res.redirect('/admin/products'))
                    })
                })
            }
        })
        .catch(error => console.log(error))
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