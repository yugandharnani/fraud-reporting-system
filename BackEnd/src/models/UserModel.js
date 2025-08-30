const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String,required:true, enum:["admin","manager","user"],default:"user"},
    cases:[{type:mongoose.Schema.Types.ObjectId, ref:'Case',required:true}],
    refreshTokens: [{ type: String }] 
},{timestamps:true});

module.exports = mongoose.model('User', UserSchema);


