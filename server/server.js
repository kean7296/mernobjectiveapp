const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const port = process.env.PORT || 726;
const connectDB = require('./config/db')
const cors = require('cors')
const { reset } = require('nodemon')

const corsOption = {
    origin: ["http://localhost:3726"],
}

connectDB()

const app = express()

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/objectives', require('./routes/objectiveRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('please set to production'))
}

app.use(errorHandler)
app.listen(port, () => console.log(`Server's started on port ${port}`.blue))


