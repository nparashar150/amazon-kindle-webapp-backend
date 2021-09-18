require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const User = require('./models/user.model');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'image' + file.originalname)
    }
})
const upload = multer({storage: storage})
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: '*',
    methods: 'GET'
}));
app.post('/register', upload.single('image'), async (req, res) => {
    try{
        const { first_name, last_name, email, password, image } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.status(409).send('The User with this email already exists.');
        }
        const encrypPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encrypPassword,
            image
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h", }
        );
        user.token = token;
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!(email && password)) {
            res.status(400).send('All input is required');
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            user.token = token;
            res.status(200).json(user);
          }
        res.status(400).send("Invalid Credentials.");
    }
    catch (error) {
        console.error(error);
    }
});
const auth = require("./middleware/auth");
app.post('/welcome', auth, (req, res) => {
    res.status(200).send('Welcome!');
});
module.exports = app;