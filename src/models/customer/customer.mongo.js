const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdTimestamp: {
        required: true,
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)