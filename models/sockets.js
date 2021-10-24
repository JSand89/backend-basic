


class Sockets{
    constructor(io){

        this.io= io;
        this.socketEvents();


    }
    socketEvents(){
        //on connection
        this.io.on('connection', (socket) => { 

        //toDo: validar el JWT
        // si el token no es valido desconectar

        //toDo:saber que usuario esta activo mediante el UID

        //ToDo: Emitir todos los usuarios conectados

        //ToDo: Socket join, uid

        //ToDo: escuchar cuando el cliente emite el mensaje

        // ToDo: Disconnet
        //marcar en la bd 

        //ToDo: emitir todos los usuarios conectados

         });
    }




}

module.exports=Sockets;