const express = require('express');

const router = express.Router();

const servicioCtrl = require('../controllers/servicio.controller');

router.get('/', servicioCtrl.getServicios);

router.post('/', servicioCtrl.createServicios);

router.get('/:id', servicioCtrl.getUnicoServicio);

router.put('/:id',servicioCtrl.editarServicio);

router.delete('/:id', servicioCtrl.eliminarServicio);

module.exports = router;