import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },

    //slug is used in space (like  this -)
    slug:{
        type:String,
        required:true,
        lowercase:true
    }

})

export default mongoose.model('category',categorySchema)