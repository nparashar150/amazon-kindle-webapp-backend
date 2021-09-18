const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String, 
        unique: true
    },
    password: {
        type: String
    },
    token: { 
        type: String 
    },
    image: {
        type: Object,
        require: true
    }
});
module.exports = mongoose.model('user', userSchema);