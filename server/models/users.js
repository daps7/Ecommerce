const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let usersSchema = new mongoose.Schema(
   {
        first_name: {type: String, required:true},
        last_name: {type: String, required:true},
        username: {type: String, required:true},
        email: {type: String, required:true, unique: true},
        password: {type: String, required:true}
   },
   {
       collection: 'users'
   })

usersSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model('users', usersSchema)