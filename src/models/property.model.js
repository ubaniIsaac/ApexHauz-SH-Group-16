const db = require("../config/db.config")

class Property {
    constructor(id, owner, price, state, city, address, type, imageUrl, dateCreated) {
        this.id = id;
        this.owner = owner;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.type = type;
        this.imageUrl = imageUrl;
        this.dateCreated = dateCreated
    }

    static getAll(result) {
        db.query('SELECT * FROM property', (err, res) => {
            if (err) {
                console.log(`error : ${err}`);
                result(null, err);
                return;
            }

            console.log(`property: ${res}`);
            result(null, res);
        })
    }

    static getById(id, result) {
        db.query(`SELECT * FROM property WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log(`Property: ${res[0]}`);
                result(null, res[0]);
                return;
            }

            result({ kind: "not found" }, null);
        });

    }

}

module.exports = Property;