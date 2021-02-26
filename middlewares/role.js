module.exports = function(request, response, next) {
    const { role } = request.user;

    if (role !== "ADMIN") {
        response.status(401).json({
            message: "No eres administrador",
            code: "NO_ADMIN"
        });
    } else {
        next();
    }
}