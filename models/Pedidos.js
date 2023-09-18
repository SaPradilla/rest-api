const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pedidoSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref:'Clientes'
    },
    pedido: [{
        producto:{
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: {
            type:Number
        }
    }],
    total: {
        type: Number
    }

});
module.exports = mongoose.model('Pedidos', pedidoSchema);  