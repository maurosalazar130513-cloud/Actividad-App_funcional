const mongoose = require('mongoose');

const {Schema} = mongoose;

const ServicioSchema = new Schema({

    name: {type:String, require:true},

    service_type: {type:String, require:true},

    price: {type:Number, require:true},

});

module.exports = mongoose.model('Servicio', ServicioSchema);