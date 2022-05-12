//User Model
const db = require("./src/config/db.config.js")

module.exports = class users {
    constructor(id, email,first_name, last_name, password, phone, address){
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name; 
        this.password = password;
        this.phone = phone;
        this.address = address;

        this.insert();
    }

    insert = () => {
        db.query("INSERT INTO users VALUES (?,?,?,?,?,?,?)", [this.id, this.email, this.first_name, this.last_name, this.password, this.phone, this.address])
    }
    
}