    const express = require('express')
    const mongoose = require('mongoose')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const app = express()
    const route = require('./routes')
    require('dotenv').config()
    const puerto = process.env.PORT 
    

    const uri = "mongodb://mongo:Dcf26fCgFFaC2HEe4gbDAF2-a-B5-da4@viaduct.proxy.rlwy.net:26076";
    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    const db = mongoose.connection

    db.on("error",console.error.bind(console,"conection failed: "))
    db.once("open", function () {
        console.log("Connectado melo")
    })
   

    app.use(cors())

    //Server
    app.listen(puerto, function(){
        console.log(`Conectado a localhost:${puerto}`)
    })
    // capturar body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}))


    app.use('/uploads', express.static('uploads'))

    // rutas
    app.use('/api',route)