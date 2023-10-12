const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Auth", AuthSchema);