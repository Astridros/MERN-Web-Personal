const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    tittle: String,
    path: String,
    order: Number,
    active: Boolean,

});

module.exports = mongoose.model("Menu", MenuSchema);