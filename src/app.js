const cors = require('cors')
const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const vendorRouter = require('./routers/vendor')

const app = express()

app.use(express.json())

// CORS request headers
app.use(cors())

app.use(userRouter)
app.use(vendorRouter)

module.exports = app
