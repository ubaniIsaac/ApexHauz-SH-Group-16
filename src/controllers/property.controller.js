const Property = require("../models/property.model");

exports.getAll = (req, res) => {

    Property.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving properties"
            });
        } else res.send(data);

    })


}

exports.getOne = (req, res) => {
    Property.getById(Number(req.params.id), (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: `No property with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Property"
                })
            }
        } else res.send(data);
    })

}