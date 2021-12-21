let { products, categories } = require('../database/dataBase')

let controller = {
    detail: (req, res) => {
        let productDetailId = +req.params.id;

        let product = products.find(product => product.id === productDetailId)
        let relatedProducts = products.filter(relatedProduct => relatedProduct.category === product.category)
        
        res.render('productDetail', {
            product,
            sliderTitle: "Productos relacionados",
            sliderProducts: relatedProducts,
            session: req.session
        })
    },
    category: (req, res) => {
        let categoryId = +req.params.id;

        let productsCategory = products.filter(product => +product.category === categoryId)
        let category = categories.find(category => category.id === categoryId)
        let subcategories = productsCategory.map(product => product.subcategory)
        let uniqueSubcategories = subcategories.filter((x, i, a) => a.indexOf(x) == i)

        res.render('categories', {
            products: productsCategory,
            category,
            subcategories: uniqueSubcategories,
            session: req.session
        })
    },
    subcategory: (req, res) => {
       let subcategoryName = req.params.subcategory.toLowerCase()
       let categoryId = +req.params.categoryId 
       
       let productsSubcategories = products.filter(product => product.subcategory.toLowerCase() === subcategoryName)
       let productsCategory = products.filter(product => +product.category === categoryId)
       let category = categories.find(category => category.id === categoryId)
       let subcategories = productsCategory.map(product => product.subcategory)
       let uniqueSubcategories = subcategories.filter((x, i, a) => a.indexOf(x) == i)

       res.render('subcategory', {
           products: productsSubcategories,
           category,
           subcategories: uniqueSubcategories,
            session: req.session
       })
    },
    search: (req, res) => {
        let keywords = req.query.keywords.trim().toLowerCase()

        let result = products.filter(product => product.name.toLowerCase().includes(keywords))
        
        res.render('searchResult', {
            result,
            search: keywords,
            session: req.session
        })

    }
}

module.exports = controller