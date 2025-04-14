const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email field must be filled']
    },
    name: {
        type: String,
        require: [true, 'Name field must be filled'],
        maxlength: [225, "Character length must be set range 3 - 225"],
        minlength: [3, "Character length must be set range 3 - 225"]
    },
    username: {
        type: String,
        require: [true, 'Username field must be filled'],
        maxlength: [225, "Character length must be set range 3 - 225"],
        minlength: [3, "Character length must be set range 3 - 225"]
    },
    password: {
        type: String,
        require: [true, 'Password field must be filled'],
        maxlength: [225, "Character length must be set range 3 - 225"],
        minlength: [3, "Character length must be set range 3 - 225"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String
    },
    fileName: {
        type: String
    },
    phoneNumber: {
        type: Number,
        require: [true, 'Phone number field must be filled'],
        maxlength: [13, "Character length must be set range 9 - 13"],
        minlength: [9, "Character length must be set range 9 - 13"]
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true });

playerSchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Player').countDocuments({ email: value })
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} has been registered`)

playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})



module.exports = mongoose.model('Player', playerSchema);