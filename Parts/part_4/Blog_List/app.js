const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const token_extractor = require('./utils/token_extractor')
const logger = require('./utils/logger')
const error_handler = require('./utils/error_handler')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(token_extractor)

mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(error_handler)

module.exports = app
