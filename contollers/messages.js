const Message = require('../models/message')

const getChat = async (req,res)=>{

    const miId = req.uid;
    const msgde = req.params.de;

    const last30 = await Message.find({
        $or:[
            {de:miId , para:msgde},
            {de:msgde, para:miId}
        ]
    })
    .sort({createdAt:'desc'}).limit(30) ;

    res.json({
        ok:true,
        mensajes: last30
    })
}

module.exports = {
    getChat
} 