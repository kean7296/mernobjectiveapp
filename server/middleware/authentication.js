const { request } = require('http')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authenticate = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        var token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        User.findById(decode.id)
        .select('-password')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            next(err)
        })            
    } else {
        res.status(403)
        throw new Error('Not authorized')
    }
}

module.exports = {
    authenticate
}