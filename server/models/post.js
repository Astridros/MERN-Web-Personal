const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


const PostSchema = new mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);



