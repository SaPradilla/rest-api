const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const route = require('./routes')
require('dotenv').config()
const puerto = 7060

// BD
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.gxtyny0.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => 
    console.log('Base de datos conectada correctamente'
    )).catch(error => 
        console.log('error al conectarse a la db:', error
    ))

// server
app.listen(puerto, () =>{
    console.log(`Te has conectado a http://localhost:${puerto}`)
})

// capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json());


// rutas
app.use('/',route)