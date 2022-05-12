const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_USER_PASSWORD,
    database: process.env.MYSQL_DATABASE
})
db.connect()

db.query("SELECT 1+1 AS SOLUTION", (err, row,fields)=>{
    if( err) throw err
    console.log(`The solution is: ${row[0].selection}`)
})
db.end()

module.exports = db;