const mongoose = require('mongoose');
let newdataSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: String,
        require: true
    },
    pages: {
        type: Number,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
});
module.exports = newdataSchema;