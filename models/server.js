const express=require('express');
const http =require('http');
const socketio = require('socket.io');
const path= require('path');
const cors = require('cors');

const {dbConnection}= require('../database/config')
const Sockets = require('./sockets')






class Server{

    constructor(){
        this.app  = express();
        this.port= process.env.PORT;

        //conect DB
        dbConnection();

        //http server
        this.server=http.createServer(this.app);

        // setting sockets
        this.io = socketio(this.server,{/*config */});


    }


    middlewares(){
        //deploy public directory

        this.app.use( express.static( path.resolve( __dirname, '../public')));

        //Parseo Body

        this.app.use(express.json() );
        
        //cors
        this.app.use(cors());

        //API end
        this.app.use('/api/login', require('../router/auth'))
        this.app.use('/api/mensajes', require('../router/messages'))

    }

        //setting socket
    settingSockets(){
        new Sockets(this.io);
    }
    
    
    execute(){

        //init middlewares
        this.middlewares();
        // init sockets
        this.settingSockets();
        //init seever
        this.server.listen( this.port,()=>{
            console.log("server runing port:",this.port)
        });
    }
}

module.exports=Server;