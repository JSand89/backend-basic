const { Schema, model}=require('mongoose')

const TicketSchema =Schema({
    history:{
        type:String,
        required:true
    },
    tiquet:{
        type:String,
        required:true
    },
    nameRoom:{
        type:String,
        required:true
    },
    proyect:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false,
        default:"En epera"
    },

});

TicketSchema.method('toJSON', function(){

    const {__v, ...object}=this.toObject();
    return object;
});

module.exports =model('Ticket',TicketSchema)