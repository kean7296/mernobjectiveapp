const mongoose = require('mongoose')

const objectiveSchema = mongoose.Schema({
    text: {
        type: String,
        required: [
            true,
            'text value is required'
        ],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Objective', objectiveSchema)