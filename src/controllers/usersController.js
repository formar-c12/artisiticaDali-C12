const { users, writeUsersJSON } = require('../database/dataBase');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

let controller = {
    login: (req, res) => {
        res.render('login', {
            session: req.session
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email);
           
            req.session.user = {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }

           if(req.body.remember){
               const TIME_IN_MILISECONDS = 60000
               res.cookie("userArtisticaDali", req.session.user, {
                   expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                   httpOnly: true,
                   secure: true
               })
           }

            res.locals.user = req.session.user;

            res.redirect('/')

        }else{
            res.render('login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render('register', {
            session: req.session
        })
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
                pass: bcrypt.hashSync(pass1, 10),
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
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie('userArtisticaDali', "", { maxAge: -1 })
        }
        res.redirect('/')
    }, 
    profile: (req, res) => {
        let user = users.find(user => user.id === req.session.user.id)

        res.render('userProfile', {
            user, 
            session: req.session
        })
    }
}

module.exports = controller
