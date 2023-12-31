const Pedidos = require('../models/Pedidos')

const nuevoPedido = async (req,res,next)=>{
    try{
        const nuevoPedido = new Pedidos(req.body)
        await nuevoPedido.save();
        res.json({
            msg:'Pedido registrado con exito',
            Pedido:nuevoPedido
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}
const mostrarPedidos = async(req,res,next)=>{
    try{
        // Nos traen la tabla con la esta relacionada
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json({
            msg:'Pedidos visualizados correctamente',
            Pedidos:pedidos
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}
const mostrarPedido = async(req,res,next)=>{
    try{
        // Nos traen la tabla con la esta relacionada
        const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        if(!pedido){
            res.json({
                msg:'No se encontró el pedido '
            })
            return next()
        }
        res.json({
            msg:'Pedido visualizado correctamente',
            Pedido:pedido
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}
const actualizarPedido = async (req, res, next) => {
    try {
        const editPedido = await Pedidos.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )

        if (!editPedido) {
            return res.json({
                msg: 'No se encontró el pedido'
            })
        }

        res.json({
            msg: 'Pedido actualizado con éxito',
            editPedido: editPedido
        })
    } catch (error) {
        console.log(`Hubo un error: ${error}`)
        next(error)
    }
};

const eliminarPedido = async(req,res,next)=>{
    try{
        await Pedidos.findOneAndDelete({_id:req.params.id})
            res.json({
                msg:'El Producto ha sido eliminado'
            })
        
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}
module.exports ={nuevoPedido,mostrarPedidos,mostrarPedido,actualizarPedido,eliminarPedido}