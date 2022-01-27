const db = require('../database/models');
const { Op } = require('sequelize');

const Products = db.Product;

let controller = {
    index: (req, res) => {
        Products.findAll({
            include: [{ association: 'productImages' }],
            where: {
                discount: {
                    [Op.gte]: 5
                }
            }
        })
        .then((productsInSale) => {
            res.render('home', {
                sliderTitle: "Ofertas destacadas",
                sliderProducts: productsInSale,
                session: req.session
            })
        })
        .catch(error => console.log(error))
    }
}

module.exports = controller