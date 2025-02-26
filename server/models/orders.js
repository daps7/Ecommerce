const mongoose = require(`mongoose`)

let ordersSchema = new mongoose.Schema(
   {
        order_name: {type: String, required:true},
        order_description: {type: String, required:true},
        tracking: {type: String, required:true},
        shipping: {type: Number, required:true},
        due_date: {type: Date, required:true}
   },
   {
       collection: `orders`
   })

module.exports = mongoose.model(`orders`, ordersSchema)