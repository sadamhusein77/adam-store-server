const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup : {
        gameName: { type: String, require: [true, 'Game name must be filled']},
        category: { type: String, require: [true, 'Category must be choosen']},
        thumbnail: { type: String},
        coinName: { type: String, require: [true, 'Coin name must be filled']},
        coinQuantity: { type: String, require: [true, 'Coin Quantity must be filled']},
        price: { type: Number}
    },
    historyPayment : {
        name: { type: String, require: [true, 'Name must be filled']},
        type: { type: String, require: [true, 'Payment Method must be choosen']},
        bankName: { type: String, require: [true, 'Bank name must be filled']},
        noRekening: { type: String, require: [true, 'Account number must be filled']}
    },
    name: {
        type: String,
        require: [true, 'Name field must be filled'],
        maxlength: [225, "Character length must be set range 3 - 225"],
        minlength: [3, "Character length must be set range 3 - 225"]
    },
    accountUser: {
        type: String,
        require: [true, 'Name Account field must be filled'],
        maxlength: [225, "Character length must be set range 3 - 225"],
        minlength: [3, "Character length must be set range 3 - 225"]
    },
    tax: {
        type: Number,
        default: 0
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser: {
        name: { type: String, require: [true, 'Name must be filled']},
        phoneNumber: {
            type: Number,
            require: [true, 'Phone number field must be filled'],
            maxlength: [13, "Character length must be set range 9 - 13"],
            minlength: [9, "Character length must be set range 9 - 13"]
        },
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema);