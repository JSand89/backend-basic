const Message = require('../models/message')

const getChat = async (req,res)=>{

    const miId = req.uid;
    const msgde = req.params.de;

    const roomIds = (msgde ==='6178782f14cc9720b4a8f191')||
                    (msgde === '6178784c14cc9720b4a8f19b') ||
                    (msgde === '617878ad14cc9720b4a8f1ad') ||
                    (msgde ==='6178794c14cc9720b4a8f1b7');

    //console.log(roomIds)     
    
    
    if (roomIds){

        const last30 = await Message.find({
            $or:[
                {to:msgde}
            ]
        })
        .sort({createdAt:'asc'}).limit(30) ;
        res.json({
            ok:true,
            mensajes: last30
        })

    }
    else{
    const last30 = await Message.find({
        $or:[
            {to:miId , de:msgde},
            {to:msgde, de:miId}
        ]
    })
    .sort({createdAt:'asc'}).limit(30) ;

    res.json({
        ok:true,
        mensajes: last30
    })
    }

}

module.exports = {
    getChat
} 