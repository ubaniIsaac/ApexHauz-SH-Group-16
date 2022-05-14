//User Model
const db = require("../config/db.config")

module.exports = class users {
    constructor(id, email,first_name, last_name, password, phone, address){
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name; 
        this.password = password;
        this.phone = phone;
        this.address = address;

        // this.insert();  //This makes sure the insert method is ran once the object is instantiated
    }

    static create (newUser, cb)  {
        // Run your full insert operation here
        db.query("INSERT INTO users ( email,first_name, last_name, password, phone, address) VALUES (?,?,?,?,?,?,?)", [ newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address], (err, res)=>{
            if(err){
                console.log(`ERROR: ${err}`);
                return
            }
            cb(null, {
                ...newUser
            })
        })
    }
    
}