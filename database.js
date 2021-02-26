const { connect } = require('mongoose');

module.exports = function() {
    connect(process.env.MONGO_RINCON, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(function() {
            console.log('Conectado a la base de datos ;)')
        })
        .catch(function() {
            console.error('No se puede establecer conexion con la BD');
            process.exit(1);
        });
}