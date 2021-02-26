const UserModel = require('../schemas/user');
const Router = require('express').Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

Router.post('/', function(request, response) {
    const { email, password } = request.body;

    UserModel.findOne({ email })
        .then(function(document) {
            if (!document) {
                response.status(401)
                    .json({
                        message: "No existe el correo electrónico",
                        code: "AUTH_EMAIL_NOT_FOUND"
                    });
            } else {
                const hash = md5(password);

                if (hash === document.password) {
                    const token = jwt.sign({
                        id: document._id.toString(),
                        role: document.role
                    }, process.env.JWT_SECRET);

                    response.json({ data: { token } });
                } else {
                    response.status(401).json({
                        message: "Contraseña Incorrecta, Pruebe de nuevo",
                        code: "AUTH_PASSWORD"
                    });
                }
            }
        })
        .catch(function(error) {
            response.status(401).json({
                message: error.message,
                code: "AUTH"
            })
        });
});

module.exports = Router;