const Router = require('express').Router();
const ProductModel = require('../schemas/product');
const SessionMiddleware = require('../middlewares/session');
const RoleMiddleware = require('../middlewares/role');


Router.get('/', function(request, response) {
    ProductModel.find()
        .then(function(products) {
            response.json({ data: products });
        })
        .catch(function(error) {
            response.status(500).json({
                message: error.message,
                code: "GET_ALL_PRODUCTS"
            })
        })
});

Router.get('/:id', function(request, response) {
    ProductModel.findById(request.params.id)
        .then(function(product) {
            response.json({ data: product });
        })
        .catch(function(error) {
            response.status(500).json({
                message: error.message,
                code: "GET_PRODUCT"
            })
        })
});

Router.post('/', [SessionMiddleware, RoleMiddleware], function(request, response) {
    let { body } = request;
    new ProductModel(body).save()
        .then(function(document) {
            response.json({ data: document });
        })
        .catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "PRODUCT_CREATION"
            });
        });
});

module.exports = Router;