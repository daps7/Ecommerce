const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
   {
        product_name: {type: String, required:true},
        product_description: {type: String, required:true},
        image_data: {type: String, required:true},
        price: {type: Number, required:true},
        stock: {type: Number, required:true}
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsSchema)