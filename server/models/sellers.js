const mongoose = require(`mongoose`)

let sellersSchema = new mongoose.Schema(
   {
        seller_name: {type: String, required:true},
        seller_description: {type: String, required:true},
        seller_location: {type: String, required:true}
   },
   {
       collection: `sellers`
   })

module.exports = mongoose.model(`sellers`, sellersSchema)