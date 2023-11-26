    const express = require('express')
    const mongoose = require('mongoose')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const app = express()
    const route = require('./routes')
    require('dotenv').config()
    const puerto = 7060
    
    const uri = "mongodb://mongo:Dcf26fCgFFaC2HEe4gbDAF2-a-B5-da4@viaduct.proxy.rlwy.net:26076";
    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    const db = mongoose.connection

    db.on("error",console.error.bind(console,"conection failed: "))
    db.once("open", function () {
        console.log("Connectado melo")
    })
   

    // server
    app.listen(puerto, () =>{
        console.log(`Te has conectado a http://localhost:${puerto}`)
    })
    // capturar body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // app.use(express.json());
    app.use('/uploads', express.static('uploads'))

    app.use(cors())
    // rutas
    app.use('/',route)