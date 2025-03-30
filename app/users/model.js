const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email type field must be filled']
    },
    name: {
        type: String,
        require: [true, 'Name type field must be filled']
    },
    password: {
        type: String,
        require: [true, 'Password type field must be filled']
    },
    status: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'Phonme number type field must be filled']
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);