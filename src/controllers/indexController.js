let db = require('../database/dataBase')

let controller = {
    index: (req, res) => {
        let products = db.products
        console.log(products)
        res.render('home', {
            sliderTitle: "Ofertas destacadas 2",
            sliderProducts: db.products
        })
    }
}

module.exports = controller