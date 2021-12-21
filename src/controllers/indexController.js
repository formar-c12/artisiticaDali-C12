let { products } = require('../database/dataBase')

let controller = {
    index: (req, res) => {
        let productsInSale = products.filter(product => product.discount >= 10)
        
        res.render('home', {
            sliderTitle: "Ofertas destacadas",
            sliderProducts: productsInSale,
            session: req.session
        })
    }
}

module.exports = controller