const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const methodOverride = require('method-override')

/* Middlewares */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs") // Setea el template engine
app.set('views', path.join(__dirname, 'views')) // Indica la ubicación de la carpeta views 

/* Enrutadores */
let indexRouter = require('./routes/index')
let productsRouter = require('./routes/products')
let usersRouter = require('./routes/users')
let adminRouter = require('./routes/admin')

/* Routes */
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)


app.listen(PORT, () => console.log(`
Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}
`))