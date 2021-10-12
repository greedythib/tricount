const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {type: String, required : true},
    name: {type: String, required : true},
    totalCredit: {type: String, required: true},
    creditors: {type: Array, required : true},
    debtors: {type: Array, required: true},
});

module.exports = mongoose.model('User', userSchema);
