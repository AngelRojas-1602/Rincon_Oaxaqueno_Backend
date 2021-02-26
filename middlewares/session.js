const jwt = require('jsonwebtoken');

module.exports = function(request, response, next) {
    const token = request.get('Authentication');

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        request.user = data;
        next();
    } catch (e) {
        response.status(401).json({
            message: 'No tienes acceso a este recurso',
            code: "NOT_AUTHORIZED"
        });
    }
}