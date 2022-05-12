const router = require('express').Router();
const userController = require("../controllers/user.controller")

module.exports = app => {
    //Register a User
    router.post("/register", userController.register)

    //Login
    router.post("/login", userController.login)
}




module.exports = router;