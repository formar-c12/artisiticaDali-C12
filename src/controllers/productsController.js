let { products } = require('../database/dataBase')

let controller = {
    detail: (req, res) => {
        let productDetailId = +req.params.id;

        let product = products.find(product => product.id === productDetailId)
        let relatedProducts = products.filter(relatedProduct => relatedProduct.category === product.category)
        
        res.render('productDetail', {
            product,
            sliderTitle: "Productos relacionados",
            sliderProducts: relatedProducts
        })
    }
}

module.exports = controller