const conectar = require('./Db/db')
const cookieParser = require('cookie-parser')
const route= require('./Routes/userRoute')
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port
conectar()

app.use(cookieParser())
app.set('views', './View');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(route)

app.listen(port, () =>
console.log(`Server rodando (http://localhost:${port})`))