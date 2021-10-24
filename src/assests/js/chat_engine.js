//pick the socket cdn
console.log("chat engine on!!!!");
class ChatEngine{
    constructor(chatBox,userEmail){
        this.chatBox=$(`#${chatBox}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:3001');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        this.socket.on('connect',function(){
            console.log("Connection established with backend");
        })
    }
}