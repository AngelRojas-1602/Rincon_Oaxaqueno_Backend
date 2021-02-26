require('dotenv').config();
require('./database')();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const ProductRouter = require('./routes/product');
const UserRouter = require('./routes/user');
const AuthRouter = require('./routes/auth');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

app.get('/', (req, res) => {
    res.send("Welcome to Rincon Oaxaqueño");
})


app.listen(process.env.PORT, function() {
    console.log(`> Servidor escuchando en el puerto ${process.env.PORT}`);
});