const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/productsDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
 
const productSchema = new mongoose.Schema({
    productCode: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
        type: Number
    },
});

module.exports =  mongoose.model('product',productSchema);