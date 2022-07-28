const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const { errorHandler } = require('../middleware/errorHandler')

const registerUser = (req, res, next) => {
    const {name, email, password} = req.body
    
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('name, email, and password are required fields')
    }

    User.findOne({email})
    .then(user => {
        if (user) { 
            res.status(400)
            throw new Error('User already exists')
        }

        bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(password, salt)
            .then(hashPassword => {

                User.create({
                    name,
                    email,
                    password: hashPassword,
                })
                .then(user => {
                    if (!user) {
                        res.status(400)
                        throw new Error('invalid user data')
                    }
                    res.status(201).json({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        token: generateToken(user.id)
                    })
                }).catch(err => next(err))
            }).catch(err => next(err))
        }).catch(err => next(err))
    }).catch(err => next(err))
}

const loginUser = (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('email and password must be required') 
    }

    User.findOne({email})
    .then(user => {
        if (!user) {
            res.status(400)
            throw new Error('User not exists')
        }

        bcrypt.compare(password, user.password)
        .then(result => {
            if (!result) {
                res.status(400)
                throw new Error('Invalid password')
            }

            res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: generateToken(user.id)
            })
        }).catch(err => next(err))
    })
    .catch(err => next(err))
}

const getUserInfo = (req, res, next) => {
    res.json(req.user)
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
}