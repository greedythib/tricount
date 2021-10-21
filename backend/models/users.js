const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    id: {type: String, required : true},
    name: {type: String, required : true, unique: true},
    totalDebt: {type: String, required: true},
    creditors: {type: Array, required : true},
    debtors: {type: Array, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
