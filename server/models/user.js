const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessLevel: { type: Number, default: 0 } // 0: unregistered, 1: logged in, 2: admin
});

module.exports = mongoose.model("User", userSchema);
