const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { SECRET } = require('../utils/config')

const user_extractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, SECRET)
        if (decodedToken.id) {
            const blogUser = await User.findById(decodedToken.id)
            if (blogUser) {
                request.user = blogUser
            }
        }
    }

    next()
}

module.exports = user_extractor
