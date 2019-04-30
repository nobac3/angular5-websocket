const app = require('express')();


const config = {pingTimeout: 60000};
const http = require('http').Server(app);
const io = require('socket.io')(http, config);
const https = require('https')

//Models
const Message = require('../models/message')

//Mongoose
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost:27017/Chatbox', { useNewUrlParser: true })

var bodyParser = require('body-parser')
var cors = require('cors')

app.set('port', process.env.port || 3000)
app.use(bodyParser.json())
app.use(cors())


app.get('/messagelist', (req, res) =>{ 

  Message.find({}, (err, msg) =>{

    res.send(msg); 

  })
})


app.post('/post', (req, res) =>{ 

  const message = new Message()
  message.user = req.body.user
  message.msg = req.body.msg 
  message.room = req.body.room
  message.date = Date.now()
  message.color = req.body.color



  message.save((err, res) =>{ 
    if(err){
      console.log(err)
    }
    else{ 
      console.log('saved')
    }
  })

})

app.listen(app.get('port'), (err, res) =>{
  console.log('Server is running on port ' +  app.get('port'))

})


//WebSocket
io.on('connection', function(socket){
  console.log('a user connected');

  var username
  var room
  var color

  socket.on('username', (usr) => {
    username= usr
  })

  socket.on('room', (rm) =>{
    socket.leave(rm)
    room = rm
    socket.join(room)
  })

  socket.on('color', (c) =>{ 
    color = c

  })

  socket.on("sentMessage", msg => {
    var fullDate = new Date()
    console.log(color)

    io.to(room).emit('msg', {user: username ,msg, room, date: fullDate, color});
  });


});

http.listen(4444, (res)=>{ console.log('→ connected')});
