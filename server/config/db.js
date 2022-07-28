const mongoose = require('mongoose')

const connectDB = () => {
    console.log(`db started connnecting...`.yellow)
    mongoose.connect(process.env.DB_HOST)
    .then(db => console.log(`Mongo Connected: successfully connected via ${process.env.DB_HOST}`.green.underline))
    .catch(err => console.log(`Mongo Connection Error: ${err}`.red.underline))
}

module.exports = connectDB