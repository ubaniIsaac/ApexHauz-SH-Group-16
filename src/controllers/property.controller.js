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
exports.create = (req,res)=>{
    Property.createProperty(req.body,(err, data)=>{
        if(err){
            res.status(400).json({
                "status": "failed",
                "msg":"could not create property",
                
            })
            
        }else{
            res.json({
                "status":"success",
                "data": {...req.body}
            })
        }
    })
}
exports.update = (req, res)=>{
    Property.updateSpecs(Number(req.params.id),req.body,(err, data)=>{
        if(err){
            res.status(500).json({
                "status": "failed",
                "msg":"could not update property",
            })
        }else{
            res.status(200).json({
                "status":"success",
                "data": {...data}
            })
        }
    })
}
exports.markAsSold = (req, res) => {
    Property.markAsSold(Number(req.params.id),(err, data)=>{
        if(err){
            res.status(500).json({
                "status": "failed",
                "msg":"could not update property",
            })
        }else{
            res.status(200).json({
                "status":"success",
                "data": {...data}
            })
        }
    })
}