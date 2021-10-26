const { userConected, userDesConected, getUsers, getTickets } = require("../contollers/sockets");
const { checkJWT } = require("../helpers/jwt");



class Sockets{
    constructor(io){

        this.io= io;
        this.socketEvents();


    }
    socketEvents(){
        //on connection
        this.io.on('connection', async (socket) => { 

           const [valido,uid] = checkJWT(socket.handshake.query['x-token']);

           if(!valido){
               console.log('socket no identificado');
               return socket.disconnect();
           }
            console.log('cliente conectado',uid);

            await userConected(uid);



        //toDo: validar el JWT
        // si el token no es valido desconectar

        //toDo:saber que usuario esta activo mediante el UID

        //Emitir todos los usuarios conectados

        this.io.emit('list-users', await getUsers())

        //Emitir los tickets

        this.io.emit('list-tickets', await getTickets())


        //ToDo: Socket join, uid

        //ToDo: escuchar cuando el cliente emite el mensaje

        // ToDo: Disconnet
        //marcar en la bd 

        //ToDo: emitir todos los usuarios conectados

        socket.on('disconnect', async ()=>{
            console.log('client desconectado',uid);
            await userDesConected(uid)
            this.io.emit('list-users', await getUsers())

        })

         });
    }


}

module.exports=Sockets;