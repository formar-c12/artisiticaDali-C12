const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

/* Middlewares */
app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine", "ejs") // Setea el template engine
app.set('views', path.join(__dirname, 'views')) // Indica la ubicación de la carpeta views 

/* Enrutadores */
let indexRouter = require('./routes/index')
let productsRouter = require('./routes/products')
let usersRouter = require('./routes/users')

/* Routes */
app.use('/', indexRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)


app.listen(PORT, () => console.log(`
Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}
`))