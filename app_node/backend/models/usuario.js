const mongoose = require('mongoose');

const {Schema} = mongoose;

const UsuarioSchema = new Schema({

    nombre: {type:String, require:true},

    position: {type:String, require:true},

    office: {type:String, require:true},

    salary: {type:Number, require:true},

    email: {type:String, required:true, unique:true},
    
    password: {type:String, required:true},

});

module.exports = mongoose.model('Usuario', UsuarioSchema);