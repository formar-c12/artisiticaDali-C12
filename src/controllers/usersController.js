const { users } = require('../database/dataBase');
const { validationResult } = require('express-validator')

let controller = {
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            res.send("Te logueaste!")
        }else{
            res.render('login', {
                errors: errors.mapped()
            })
        }
    },
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
        res.send("Algo")
    },
}

module.exports = controller
