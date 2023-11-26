const multer = require('multer');
const Productos = require('../models/Productos');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;

const subirArchivo = (req,res,next) => {
    console.log('Buffer de la imagen:', req.file.buffer);
    // Subir la imagen a Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          return next(new Error('Error al subir la imagen a Cloudinary'));
        }
        // Almacenar la URL de la imagen en req para que puedas usarla más adelante
        req.imageUrl = result.secure_url;
        next();
        
    }).end(req.file.buffer);
}


const nuevoProducto = async(req,res,next)=>{
    const {nombre,precio} = req.body
    
    const nuevoProducto = new Productos({ 
        nombre,
        precio,
        imagen: req.imageUrl
    });

    try{
        // Guarda el registro en la base de datos
        await nuevoProducto.save();

        res.status(200).json({
            msg:'Producto creado correctamente.',
            Producto:nuevoProducto
        })
    }catch(error){  
        // en caso de error
        console.log(error);
        next();
    }
}

const mostrarProductos = async(req,res,next)=>{
    try{
        const productos = await Productos.find({});
        res.json(productos)
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const mostrarProductoId = async(req,res,next)=>{
    try{
        const producto = await Productos.findById(req.params.id)
        if(!producto){
            res.json({
                msg:'No existe el Producto'
            })
            return next(); 
        }
        res.json({
            msg:'Producto visualizado con exito.',
            Producto:producto
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const actualizarProducto = async(req,res,next)=>{
    try{
        let  nuevoProducto = req.body
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
            console.log('se ejecuto')
        }else{
            let productoAnterior = await Productos.findById(req.params.id)
            nuevoProducto.imagen = productoAnterior.imagen
        }
        let editProducto = await Productos.findOneAndUpdate({_id:req.params.id},
            nuevoProducto,{
                new:true
            }
        );
        res.json({
            msg:'editado correctamente',    
            Producto: editProducto
        })
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const eliminarProducto = async(req,res,next)=>{
    try{
        await Productos.findByIdAndDelete({_id:req.params.id})
        res.json({
            msg:'El producto ha sido eliminado'
        })
        
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

module.exports={subirArchivo,nuevoProducto,mostrarProductos,mostrarProductoId,actualizarProducto,eliminarProducto}