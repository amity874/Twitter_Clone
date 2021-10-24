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
        let self=this;
        this.socket.on('connect',function(){
            console.log("Connection established with backend");
            self.socket.emit('join_room',{
              userEmail:self.userEmail,
              chatRoom:'twitter'  
            });
            self.socket.on('user_joined',function(data){
                console.log('New User in the house',data);
            });
            self.socket.on('new_message',function(data){
                console.log("Message data",data);
                let newMessage=$('<li>');
                let messageType="others-message";
                if(data.userEmail == self.userEmail){
                let messageType="own-message";
                }
                let span=$('<p>').text(data.userEmail);
                let p=$('<p>').text(data.message);
                newMessage.append(span);
                newMessage.append(p);
                newMessage.addClass(messageType);
                $('#message-list').append(newMessage);
                newMessage.addClass(messageType);
                $('#message-list').append(newMessage);
            });
            $('#send-message').click(function(){
                let message=$('#message-input').val();
                if(message!=''){
                    self.socket.emit('send_message',{
                        message:message,
                        userEmail:self.userEmail,
                        chatRoom:'twitter'
                    });
                }
                $('#message-input').val('');
            })
        });
    }
}