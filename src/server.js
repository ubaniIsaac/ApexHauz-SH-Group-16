const http = require('http')
const express = require('express')
const path = require('path')

const app = express()

// const cors = require('cors')

const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, '..', 'public ')))
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})