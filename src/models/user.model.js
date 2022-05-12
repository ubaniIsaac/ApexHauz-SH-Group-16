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

        this.insert();  //This makes sure the insert method is ran once the object is instantiated
    }

    insert = () => {
        // Run your full insert operation here
        db.query("INSERT INTO users VALUES (?,?,?,?,?,?,?)", [this.id, this.email, this.first_name, this.last_name, this.password, this.phone, this.address])
    }
    
}