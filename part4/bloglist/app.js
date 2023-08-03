const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
