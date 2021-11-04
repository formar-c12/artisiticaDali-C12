const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

/* Middlewares */
app.use(express.static('public'));

/* Routes */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/views/home.html"))
})


app.listen(PORT, () => console.log(`
Servidor levantado en el puerto ${PORT}
http://localhost:${PORT}
`))