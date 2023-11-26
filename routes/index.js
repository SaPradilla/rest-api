const express = require('express')
const router = express.Router()
const {upload} = require('../helpers/logicUploadImagen')
const clienteController = require('../controllers/clienteController')
const productoController = require('../controllers/productoController')
const pedidoController = require('../controllers/pedidoController')
router
    // CLIENTES
    .post('/clientes',clienteController.nuevoCliente)
    .get('/clientes',clienteController.mostrarClientes)
    .get('/clientes/:idCliente',clienteController.mostrarClienteId)
    .put('/clientes/:id',clienteController.actualizarCliente)
    .delete('/clientes/:id',clienteController.eliminarCliente)
    // PRODUCTO
    .post('/productos',upload,productoController.subirArchivo, productoController.nuevoProducto)
    .get('/productos',productoController.mostrarProductos)
    .get('/productos/:id',productoController.mostrarProductoId)
    .put('/productos/:id',upload, productoController.subirArchivo ,productoController.actualizarProducto)
    .delete('/productos/:id',productoController.eliminarProducto)
    // PEDIDOS
    .post('/pedidos',pedidoController.nuevoPedido)
    .get('/pedidos',pedidoController.mostrarPedidos)
    .get('/pedidos/:id',pedidoController.mostrarPedido)
    .put('/pedidos/:id',pedidoController.actualizarPedido)
    .delete('/pedidos/:id',pedidoController.eliminarPedido)

    module.exports = router