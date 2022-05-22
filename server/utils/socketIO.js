class SocketConnection{
    constructor(io, socket){
        this.io = io;
        this.socket = socket;

        this.socket.on('disconnect', (reason)=>{
            this.disconnect(reason);
        });

        this.socket.on('hello', (message)=>{
            this.handleMessage(message);
        })
    }
    disconnect(reason){
        console.log(reason);
        this.io.removeAllListeners();
    }
    handleMessage(message){
        console.log(message)
        const reply = "Hi back!"
        this.socket.emit('hello-back', reply);
    }
}
function connect(io){
    io.on('connection', (socket)=>{
        new SocketConnection(io, socket);
    })
}
module.exports = {connect, SocketConnection};