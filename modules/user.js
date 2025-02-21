let mongoose=require('mongoose');

let User= new mongoose.Schema({
    userId:{
        type:Number,
        default:0,
    },
    userName:{
        type:String,
        required:true
    },
    userCity:{
        type:String
    }


});
const userSchema = mongoose.model("user", User,"userRec");

module.exports=userSchema;

