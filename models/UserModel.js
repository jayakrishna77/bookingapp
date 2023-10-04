const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

});

const user = mongoose.model('users', UserSchema);

module.exports = user