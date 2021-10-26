const { response } = require("express");
const { validationResult } = require("express-validator");
const Ticket = require('../models/ticket');


const createTicket = async (req,res = response)=>{

    const errors = validationResult(req)

    //const { history,tiquet, nameRoom,proyect,company,status} = req.body;

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            error:errors.mapped()
        });
    }


    try{

        const tk = new Ticket(req.body);
        await tk.save();
        res.json({
            ok:true,
            msg:'Tarea creada'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


};

const getTicket = async (req,res = response)=>{
    res.json({
        ok:true,
        msg:'room'
    })
}

module.exports={
    createTicket,
    getTicket
}