const router = require("express").Router();

const propertyController = require('../controllers/property.controller')

module.exports = app => {

    router.get("/", propertyController.getAll);

    router.get('/:id', propertyController.getOne)

    app.use('/properties', router)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}