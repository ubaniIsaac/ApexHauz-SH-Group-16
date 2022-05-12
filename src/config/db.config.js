const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"youngdollar1997$",
    database:""
})
db.connect()

db.query("SELECT 1+1 AS SOLUTION", (err, row,fields)=>{
    if( err) throw err
    console.log(`The solution is: ${row[0].selection}`)
})
db.end()

module.exports = db;