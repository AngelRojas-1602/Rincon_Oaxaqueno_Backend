const md5 = require('md5');
const UserModel = require('../schemas/user');
const Router = require('express').Router();
const SessionMiddleware = require('../middlewares/session');

Router.post('/', function(request, response) {
    let { body } = request;
    body.password = md5(body.password);
    body.role = 'ADMIN';

    new UserModel(body).save()
        .then(function(document) {
            response.json({ data: document });
        })
        .catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "USER_CREATION"
            });
        });
});

Router.get('/me', SessionMiddleware, function(request, response) {
    const { id } = request.user;

    UserModel.findById(id)
        .then(function(user) {
            response.json({ data: user });
        }).catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "USER_BY_ID"
            });
        });
});

Router.get('/me/products', SessionMiddleware, function(request, response) {
    const { id } = request.user;

    UserModel.findById(id).populate("cart")
        .then(function(user) {
            response.json({ data: user.cart });
        })
        .catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "USER_CART"
            });
        });
});

Router.put('/me/products', SessionMiddleware, function(request, response) {
    const { id } = request.user;
    const { productId } = request.body;

    UserModel.findByIdAndUpdate(id, { $push: { cart: productId } })
        .then(function() {
            response.json({
                data: { ok: true }
            });
        })
        .catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "CART_PUSH"
            });
        })
});

module.exports = Router;