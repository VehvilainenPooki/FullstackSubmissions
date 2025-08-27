const error_handler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
    	return response.status(400).send({ error: 'malformatted id' })
 	} else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }  else if (error.message.indexOf('E11000') === 0) { //E11000 == duplicate key error
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = error_handler
