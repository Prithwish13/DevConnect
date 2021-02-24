const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the Schemas
const postSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    likes:[
        {
            user:{
               type:Schema.Types.ObjectId,
                ref:'User' 
            }
        }
    ],
    comments:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        text:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        },
    }]

},{timestamps:true});

module.exports = mongoose.model('Post',postSchema);