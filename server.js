const express = require('express')
const app = express()
const mongodb = require('./database/mongoData.js')


const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

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