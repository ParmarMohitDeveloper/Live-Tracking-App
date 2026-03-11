const express = require('express');
const cors = require('cors');
const app = express();

const http = require('http');
const socketio = require("socket.io");
const path = require('path');

const server = http.createServer(app);
const io = socketio(server);

const users = {};

app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Cache-Control","no-store");
    next();
});

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{

    console.log("User connected:",socket.id);

    socket.on("join",(username)=>{
        users[socket.id] = {
            username,
            latitude:null,
            longitude:null
        };

        socket.emit("existing-users",users);

        socket.broadcast.emit("user-joined",username);
    });

    socket.on("send-location",(data)=>{

        if(users[socket.id]){

            users[socket.id].latitude = data.latitude;
            users[socket.id].longitude = data.longitude;

            io.emit("receive-location",{
                id:socket.id,
                username:users[socket.id].username,
                latitude:data.latitude,
                longitude:data.longitude
            });

        }

    });

    socket.on("disconnect",()=>{

        if(users[socket.id]){

            const username = users[socket.id].username;

            delete users[socket.id];

            io.emit("user-disconnected",socket.id);

            io.emit("user-left",username);
        }

    });

});

app.get("/",(req,res)=>{
    res.render("index");
});

server.listen(3000,()=>{
    console.log("Server running on port 3000");
});