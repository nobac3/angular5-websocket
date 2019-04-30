var mongoose = require('mongoose')

var messageSchema = new mongoose.Schema({
    user : {type:String, required:true}, 
    msg: {type:String, required:true},
    room: {type:String, required:true},
    date: {type:Date, required:true},
    color:{type:String, required:false}
})
const Message = mongoose.model('User', messageSchema)

module.exports = Message
