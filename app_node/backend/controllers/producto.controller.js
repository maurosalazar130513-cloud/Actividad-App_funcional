const Producto = require('../models/producto');

const productoCtrl = {};

/**

* DEFINO LOS MÉTODOS */

//Obtener todos los productos

productoCtrl.getProductos = async (req, res) => {

const productos = await Producto.find();

res.json(productos);

}

// Crear productos

productoCtrl.createProductos = async (req, res) => {

const producto = new Producto(req.body);

await producto.save();

res.json({

'status': 'Producto guardado'

});

}

//Conseguir un único producto

productoCtrl.getUnicoProducto = async (req, res) => {

const productoUnico = await Producto.findById(req.params.id);

res.json(productoUnico);

}

//Actualizar producto

productoCtrl.editarProducto = async (req, res) => {

const { id } = req.params;

const emepleadoEdit = {

name: req.body.name,

product_type: req.body.product_type,

price: req.body.price

};

await Producto.findByIdAndUpdate(id, {$set: emepleadoEdit}, {new: true});

res.json({status: 'Producto Actualizado'});

}

// Eliminar producto

productoCtrl.eliminarProducto = async (req, res) => {

await Producto.findByIdAndDelete(req.params.id);

res.json({status: 'Producto Eliminado'});

}

//exporto el módulo

module.exports = productoCtrl;

