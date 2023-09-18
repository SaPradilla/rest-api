const multer = require('multer');
const Productos = require('../models/Productos');
const shortid = require('shortid');

const configuracionMulter= {
    storage:fileStorage = multer.diskStorage({
        destination:(req,file, cb)=>{
            cb(null,__dirname+'../../uploads')
        },
        filename:(req,file,cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(new Error('Formato No Válido'))
        }
    }
}
const upload = multer(configuracionMulter).single('imagen')

const subirArchivo = (req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({msg:error})
        }
        return next()
    })
}


const nuevoProducto = async(req,res,next)=>{
    const nuevoProducto = new Productos(req.body);
    try{
        if(req.file.filename){
            nuevoProducto.imagen = req.file.filename
        }
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
        const clientes = await Productos.find({});
        res.json(clientes)
    }catch(error){
        console.log(`Hubo un error, ${error}`)
        next();
    }
}

const mostrarProductoId = async(req,res,next)=>{
    try{
        const cliente = await Productos.findById(req.params.id)
        if(!cliente){
            res.json({
                msg:'No existe el Producto'
            })
            return next();
        }
        res.json({
            msg:'Cliente visualizado con exito.',
            Cliente:cliente
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