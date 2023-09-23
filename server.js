const express = require('express')
const app = express()
const mongodb = require('./database/mongoData.js')
const bodyParser = require('body-parser')


const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})
app.use('/', require('./routes'))

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Listening on ${host}:${port}`)
        })
    }
})