requiere('dotenv').config();
requiere('./database')();

const express = require('express');
const cors = require('cors');
const app = express();



app.listen(process.env.PORT, function() {
    console.log(`> Servidor escuchando el puerto ${process.env.PORT}`);
});