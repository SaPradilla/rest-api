    const express = require('express')
    const mongoose = require('mongoose')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const app = express()
    const route = require('./routes')
    require('dotenv').config()
    const puerto = 7060
    
    const uri = "mongodb+srv://pradi4:sena123@forapis.ymzwneg.mongodb.net/?retryWrites=true&w=majority";
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