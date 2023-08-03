const config = require('./utils/config')
const express = require('express')
const app = express()
// const morgan = require('morgan')
// morgan.token('data', (request) => {return request.method === 'POST' ? JSON.stringify(request.body) : ''})
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

logger.info('connecting to', config.MONGODB_URL)
mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data :date[iso]'))
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app