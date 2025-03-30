const mongoose = require('mongoose');
let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name field must be filled']
    },
    nameBank: {
        type: String,
        require: [true, 'Name Bank field must be filled']
    },
    noRekening: {
        type: String,
        require: [true, 'Number Bank Account field must be filled']
    }
})

module.exports = mongoose.model('Bank', bankSchema);