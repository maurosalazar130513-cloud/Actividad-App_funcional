const Servicio = require('../models/servicio');

const servicioCtrl = {};

/**

* DEFINO LOS MÉTODOS */

//Obtener todos los servicios

servicioCtrl.getServicios = async (req, res) => {

const servicios = await Servicio.find();

res.json(servicios);

}

// Crear servicios

servicioCtrl.createServicios = async (req, res) => {

const servicio = new Servicio(req.body);

await servicio.save();

res.json({

'status': 'Servicio guardado'

});

}

//Conseguir un único servicio

servicioCtrl.getUnicoServicio = async (req, res) => {

const servicioUnico = await Servicio.findById(req.params.id);

res.json(servicioUnico);

}

//Actualizar servicio

servicioCtrl.editarServicio = async (req, res) => {

const { id } = req.params;

const emepleadoEdit = {

name: req.body.name,

position: req.body.position,

office: req.body.office,

salary: req.body.salary

};

await Servicio.findByIdAndUpdate(id, {$set: emepleadoEdit}, {new: true});

res.json({status: 'Servicio Actualizado'});

}

// Eliminar servicio

servicioCtrl.eliminarServicio = async (req, res) => {

await Servicio.findByIdAndDelete(req.params.id);

res.json({status: 'Servicio Eliminado'});

}

//exporto el módulo

module.exports = servicioCtrl;

