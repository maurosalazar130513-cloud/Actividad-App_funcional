const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductoSchema = new Schema({

    name: {type:String, require:true},

    product_type: {type:String, require:true},

    price: {type:Number, require:true},

});

module.exports = mongoose.model('Producto', ProductoSchema);