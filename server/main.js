var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var notes = [
    {"task":"Vue","priority":2,"date_creation":"5/2/2019 13:56:52","state":false},
    {"task":"Node","priority":2,"date_creation":"5/2/2019 13:56:52","state":false}
];


// Settings for CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    
    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
    });

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
