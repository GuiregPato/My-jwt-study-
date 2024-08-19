const mongoose = require("mongoose");
require ('dotenv').config()

const url = process.env.dbURL
 const conectar = () =>{
    mongoose.connect(url).then(() => console.log('MongoDB ON!')).catch((err) => console.log('MongoDB OFF!'))
 }

 module.exports = conectar