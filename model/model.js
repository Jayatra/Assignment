const mongoose = require('mongoose');

const  productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

 const product = mongoose.model('Products',productSchema);
 module.exports = product;