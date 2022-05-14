const router = require('express').Router();
const userController = require("../controllers/user.controller")

module.exports = app => {
    //Register a User
    router.post("/register", userController.register)

    //Login
    router.post("/login", userController.login)
    app.use('/user', router)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}



