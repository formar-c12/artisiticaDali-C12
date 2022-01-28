let { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Users = db.User;

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
           return Users.findOne({
               where: {
                   email: req.body.email
               }
           })
           .then(user => {
               if(!bcrypt.compareSync(req.body.pass, user.dataValues.pass)){
                   return Promise.reject()
               }
           })
           .catch(() => {
               return Promise.reject("Email o contraseña incorrecta")
           })
        })
]