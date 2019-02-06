var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var notes = [
    {"task":"Vue","priority":2,"date_creation":"5/2/2019 13:56:52","state":false},
    {"task":"Node","priority":2,"date_creation":"5/2/2019 13:56:52","state":false}
];

// SOCKET.IO
io.on('connection', function(socket){
    console.log("connected");

    socket.emit('notes',JSON.stringify(notes));
    // socket.on('notes',JSON.parse(notes));

    socket.on('nick',function(nick){
        // console.log("user connected: "+nick);
        socket.broadcast.emit('nick',nick);
       

        socket.on('chat message', function(msg){
            // console.log('message: ' + msg);
            io.emit('chat message', chatResponse = { 
                    nick: nick,
                    msg: msg
                }               
            );
        });;
    });        

    // DISCONNECTED
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
