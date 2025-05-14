const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Welcome to my app!')
})

module.exports = routes
