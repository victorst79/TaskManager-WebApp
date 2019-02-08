var express = require('express');
var app = express();

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


app.use(express.static(__dirname + '/public'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);

var notes = [
    {
        task: "Node",
        priority: 3,
        date_creation: new Date().toLocaleString(),
        state: false,
        author: "Victor"
    },
    {
        task: "Vue",
        priority: 1,
        date_creation: new Date().toLocaleString(),
        state: false,
        author: "Victor"
    },
    {
        task: "Angular",
        priority: 2,
        date_creation: new Date().toLocaleString(),
        state: false,
        author: "Victor"
    }
];

var participants = [
    {
        id: 'user1',
        name: 'Matteo',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
    }
];


// SOCKET.IO
io.on('connection', function(socket){
    console.log("New Conexion");

    // USER LOGIN
    socket.on('user',function(user){
        console.log(user + " connected");
        socket.broadcast.emit('newUser',user);
        
        // EMIT JSON NOTES
        socket.emit('notes',JSON.stringify(notes));
       
        // RECEIVED JSON NOTES
        socket.on('newNotes', function(data){
            notes = JSON.parse(data);
            // ACT NOTES FOR ALL USERS
            io.emit('actNotes',JSON.stringify(notes));
        });

        // NOTIFY NEW NOTE
        socket.on('newNoteNotify',function(data){
            socket.broadcast.emit('newNoteNotify',data);
        })

        // NOTIFY DELETE NOTE
        socket.on('deleteNoteNotify',function(data){
            io.emit('deleteNoteNotify',data);
        })

        // NOTIFY DELETE COMPLETED NOTES
        socket.on('deleteCompleteNoteNotify',function(data){
            io.emit('deleteCompleteNoteNotify',data);
        })

        // DISCONNECTED
        socket.on('disconnect', function(){
            console.log(user + ' disconnected');
            io.emit('userDisconnect',user);
        });
    });
    // socket.on('nick',function(nick){
    //     // console.log("user connected: "+nick);
    //     socket.broadcast.emit('nick',nick);
    //     socket.on('chat message', function(msg){
    //         // console.log('message: ' + msg);
    //         io.emit('chat message', chatResponse = { 
    //                 nick: nick,
    //                 msg: msg
    //             }               
    //         );
    //     });;
    // });        

    // DISCONNECTED
    // socket.on('disconnect', function(){
    //     console.log('Anon disconnected');
    // });    
});
