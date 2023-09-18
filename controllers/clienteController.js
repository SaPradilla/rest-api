const Clientes = require('../models/Clientes')

const nuevoCliente = async(req,res,next)=>{
    const nuevoCliente = new Clientes(req.body);
    try{
        // Guarda el registro en la base de datos
        await nuevoCliente.save();
        res.status(200).json({
            msg:'Cliente creado correctamente.'
        })
    }catch(error){  
        // en caso de error
        console.log(error);
        next();
    }
}

const mostrarClientes = async(req,res,next)=>{
    try{
        const clientes = await Clientes.find({});
        res.json(clientes)
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const mostrarClienteId = async(req,res,next)=>{
    try{
        const cliente = await Clientes.findById(req.params.idCliente)
        res.json({
            msg:'Visualizado con exito',
            Cliente:cliente
        })
        if(!cliente){
            res.json({
                msg:'No existe el cliente'
            })
            next();
        }
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const actualizarCliente = async(req,res,next)=>{
    try{
        const editCliente = await Clientes.findOneAndUpdate({_id:req.params.id},
            req.body,{
                new:true
            }
        );
        res.json({
            msg:'Editado con exito',
            Cliente:editCliente
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const eliminarCliente = async(req,res,next)=>{
    try{
        const deleteCliente = await Clientes.findOneAndDelete({_id:req.params.id})
            res.json({
                msg:'El cliente ha sido eliminado'
            })
        
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

module.exports={nuevoCliente,mostrarClientes,mostrarClienteId,actualizarCliente,eliminarCliente}