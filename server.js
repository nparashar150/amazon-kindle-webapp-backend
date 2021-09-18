const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
let dataSchema = require('./models/databooks.model');
let newdataSchema = require('./models/newbooks.model');
let DataBook, NewDataBook = '';
app.use(cors({
    origin: '*',
    methods: 'GET'
}));
require('dotenv').config();
mongoose.connect(process.env.ATLAS_MONGO_CONNECTION_STRING, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Mongo Connected');
    }
});
let databooks = mongoose.model('databooks', dataSchema);
let newbooks = mongoose.model('newbooks', newdataSchema);
databooks.find((error, response) => {
    if(error) {
        console.log(`${error}`);
    }
    else {
        console.log('DataBook Exported');
        DataBook = response;
    }
});
newbooks.find((error, response) => {
    if(error){
        console.log(`${error}`);
    }
    else {
        console.log('NewBook Data Exported');
        NewDataBook = response;
    }
})
app.get('/databooks', (req, res) => {
    res.json(DataBook);
});
app.get('/newdatabooks', (req, res) => {
    res.json(NewDataBook);
});
app.listen(process.env.PORT, () => {
    console.log(`Expess Connected: ${process.env.PORT}`);
});