const cors = require('cors')
const express = require('express')
const routes = require('./routes/routes')
const boardRoutes = require('./routes/boardRoutes.js')
const cardRoutes = require('./routes/cardRoutes.js')
const { ValidationError } = require('./exception/errors.js')

const app = express()
app.use(express.json())

// Enable CORS for all routes
app.use(cors())

app.use('/', routes)
app.use('/boards', boardRoutes)
app.use('/card', cardRoutes)

// Exception handling
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  res.status(500).json({ error: 'Internal Server Error' })
})

module.exports = app
