const express = require('express')
const routes = require('./routes/routes')
const boardRoutes = require('./routes/boardRoutes.js')

const app = express()
app.use(express.json())

app.use('/', routes)
app.use('/boards', boardRoutes)

module.exports = app
