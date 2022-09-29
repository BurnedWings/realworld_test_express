const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./base-model')

var userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true,
        set: value => md5(value),
        select:false
    },
    bio: {
        type:String,
        default:null
    },
    image: {
        type:String,
        default:'http://localhost:3000/avatars/default.jpg'
    },
    birthday:{
        type:Date,
        default:null
    },
    gender:{
        type:Number,
        default:null
    },
    ...baseModel
});

module.exports = userSchema