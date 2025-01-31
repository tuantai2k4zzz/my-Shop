const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnect = require("./config/dbconnect")
const initRouter = require('./routes/index')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

initRouter(app)

dbConnect()



app.listen(process.env.PORT, () => console.log(`Server running on the port:${process.env.PORT}`))