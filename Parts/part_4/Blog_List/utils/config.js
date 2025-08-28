require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
const MONGO_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI

module.exports = { MONGO_URI, PORT, SALT_ROUNDS, SECRET }
