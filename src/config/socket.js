const { Socket } = require('socket.io');

const socket=function(socketServer){
    let io=require('socket.io')(socketServer,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET,POST"]
        }
    });
    io.sockets.on('connection',function(socket){
        console.log("New Socket connection received",socket.id);
        socket.on('disconnect',function(){
            console.log("Socket Disconnected",socket.id);
        });
    }); 

}
module.exports={socket};