const mongoose=require('mongoose') 

const todoSchema=new mongoose.Schema({
    user_id:{
        type: String,
        required:false
    },
    fullname:{
        type: String,
        required:true
    },
    contact:{
        type: Number,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    date:{
        type: String,
        required:true
    },
   slottime:{
        type: String,
        required:true
    },
    seats:{
        type: Number,
        required:true
    },
    location:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("user", todoSchema)