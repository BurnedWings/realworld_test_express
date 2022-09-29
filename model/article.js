const mongoose = require('mongoose')
const Schema =mongoose.Schema
const baseModel = require('./base-model')

var articleSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    tagList: {
        type:[String],
        default:null
    },
    favoritesCount:{
        type:Number,
        default:0
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    ...baseModel
});

module.exports = articleSchema