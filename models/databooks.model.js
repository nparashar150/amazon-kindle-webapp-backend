const mongoose = require('mongoose');
let dataSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    statuspages: {
        type: String,
        require: true
    },
    statschapter: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
});
module.exports = dataSchema;