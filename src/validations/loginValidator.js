let { check, body } = require('express-validator');
const res = require('express/lib/response');
const { users } = require('../database/dataBase')

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    
    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('custom')
        .custom((value, {req}) => {
            let user = users.find(user => user.email == req.body.email);

            if(user){
                if(user.pass === req.body.pass){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }

        }).withMessage('Credenciales inválidas')
]