const express = require('express')
const app = express()


const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`Listening on ${host}:${port}`)
})