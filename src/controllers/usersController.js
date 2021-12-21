const { users, writeUsersJSON } = require('../database/dataBase');
const { validationResult } = require('express-validator')

let controller = {
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            let user = users.find(user => user.email == req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }

            res.locals.user = req.session.user;

            res.redirect('/')

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
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            let lastId = 1;

            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });

            let { name, last_name, email, pass1 } = req.body

            let newUser = {
                id: lastId + 1,
                name,
                last_name,
                email, 
                pass: pass1,
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "ROL_USER",
                tel: "",
                address: "",
                pc: "",
                city: "",
                province: ""
            }

            users.push(newUser)

            writeUsersJSON(users)

            res.redirect('/users/login')

        }else{
            res.render('register', {
                errors: errors.mapped()
            })
        }
    },
}

module.exports = controller
