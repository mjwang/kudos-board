const cors = require('cors')
const express = require('express')
const routes = require('./routes/routes')
const boardRoutes = require('./routes/boardRoutes.js')
const cardRoutes = require('./routes/cardRoutes.js')

const app = express()
app.use(express.json())

// Enable CORS for all routes
app.use(cors())

app.use('/', routes)
app.use('/boards', boardRoutes)
app.use('/card', cardRoutes)

module.exports = app
