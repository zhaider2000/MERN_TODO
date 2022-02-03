const mongoose=require('mongoose')

const document=new mongoose.Schema({

    description:{
        type:String,
        required:true
    }
})

const todo=mongoose.model('todos',document)

module.exports=todo