const { users } = require('../database/dataBase')

let controller = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    }
}

module.exports = controller
