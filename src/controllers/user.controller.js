//User Controller
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken") 
const User = require("../models/user.model")
const db = require("../config/db.config")


exports.register = (req, res) =>{
    const {email,first_name, last_name, password, phone, address} = req.body
    if( !email || !first_name|| !last_name|| !password|| !phone|| !address){
        return res.status(400).json({error:"Content cannot be empty"})
    }
    else{
        db.query("SELECT email FROM users WHERE email = ?", [email], async(err, result)=>{
            if(err) throw err;
            if(result[0]) return res.status(400).json({error:"Email has already been used"})
            else{
                const hashPassword = bcrypt.hash(password, 13);
                const user= new User({id:id, email:email,first_name:first_name, last_name:last_name, password:hashPassword, phone:phone, address:address})
                User.create(user, (err, data)=>{
                    if(err){
                        return res.status(500).json({error:err.message || "Some error occured while creating the user"})
                    }
                    else{
                        const token = jwt.sign({id:result[0].id}, "mkjkdjjfsijlhjvjflfkjuiojhfidufkldufhdilfjkdjfiljdifjidjfiljiofiikdjfk",{expiresIn:"24h"})
                        return  res.json({status:"success", data:{user ,token}})
                    }
                })
            }
        })
    }   
}


exports.login = (req, res) =>{
    const { email,password} = req.body
    if(!email || !password){
        return res.status(400).json({status:"error",error:"Content cannot be empty"})
    }
    else{
        User.query("SELECT email FROM users WHERE email = ?", [email], async(err, result)=>{
            if(err) throw err;
            if(!result[0] || !await bcrypt.compare(password, result[0].password)){
                return res.status(400).json({status:"error",error:"Incorrect Credentials"})
            }else{
                const token = jwt.sign({id:result[0].id}, "mkjkdjjfsijlhjvjflfkjuiojhfidufkldufhdilfjkdjfiljdifjidjfiljiofiikdjfk",{expiresIn:"24h"})
                return  res.json({status:"success", data:{token}})
            }
        })
    }   
}