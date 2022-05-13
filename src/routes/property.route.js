const router = require("express").Router();

const propertyController = require('../controllers/property.controller')

module.exports = app => {

    router.get("/", propertyController.getAll);

    router.get('/:id', propertyController.getOne);

    router.post('/', propertyController.create);

    router.patch('/:id', propertyController.update);

    router.patch('/:id/sold', propertyController.markAsSold)

    app.use('/properties', router)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}