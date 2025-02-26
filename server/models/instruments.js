const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    colour: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model("Instrument", instrumentSchema);
