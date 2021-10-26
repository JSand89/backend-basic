const { userConected, userDesConected, getUsers, getTickets, saveMessage } = require("../contollers/sockets");
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



        socket.join(uid);


        //ToDo: escuchar cuando el cliente emite el mensaje

        socket.on('message-personal',async (payload)=>{
           const data = await saveMessage(payload);
            this.io.to(payload.to).emit('mensaje-personal',data);
            this.io.to(payload.de).emit('mensaje-personal',data);

        })

        
        // socket.on('message-G',async (payload)=>{
        //     const data = await saveMessage(payload);
        //      this.io.to(payload.to).emit('mensaje-G',data);
        //      this.io.to(payload.de).emit('mensaje-G',data);
 
        //  })

        // this.io.on("mensaje-grupal", socket => {
        //     socket.join("some-room");
        //   });

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