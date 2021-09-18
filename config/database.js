const mongoose = require('mongoose');
const { MONGO_JWT_CONNECTION_STRING } = process.env;
exports.connect = () => {
    mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongoose Connected');
    }).catch((error) => {
        throw error;
    })
};