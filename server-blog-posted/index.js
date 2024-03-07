// build express example code

const express = require('express')
const app = express()
const cors = require("cors")
const bodyparser = require("body-parser"); 
const port = 4000

app.use(cors())
app.use(express.json)
app.use(bodyparser.json())  // support json encoded bodies

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})