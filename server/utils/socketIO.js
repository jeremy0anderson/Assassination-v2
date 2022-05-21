const players =  new Map();

class SocketConnection{
    players = new  Map();
    constructor(io, socket){

        this.io = io;
        this.socket = socket;
        socket.on('disconnect', (reason)=>{
            console.log(reason);
            this.disconnect();
        })
        socket.on('data', (data)=>{
            this.handleData(data)
        })

    }
    connect(){
        players.set("socket", this.socket);
    }
    sendData(data){
        this.io.sockets.emit('data', data);
    }
    disconnect(){
        players.delete(this.socket);
    }
    handleData(value){
        const data = {
            value,
        };
    }
}
function connect(io){
    io.on('connection', (socket)=>{
        new SocketConnection(io, socket);
    })
}
module.exports = {connect, SocketConnection};