//User Model
const db = require("./src/config/db.config.js")

module.exports = class users {
    constructor(id, email,first_name, last_name, password, phone, address){
        this.id = id,
        this.email = email,
        this.first_name = first_name, 
        this.last_name = last_name, 
        this.password = password, 
        this.phone = phone, 
        this.address = address
    }
    db.query("INSERT INTO users VALUES (?,?,?,?,?,?,?)", [new users.id, email,first_name, last_name, password, phone, address], )
}