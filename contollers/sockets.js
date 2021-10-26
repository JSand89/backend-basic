const Ticket = require('../models/ticket');
const User = require('../models/user');
const Message =require('../models/message');

const userConected = async (uid)=>{

    const user = await User.findById(uid);

    user.online =true;
    await user.save();
    return(user)

}

const userDesConected = async (uid)=>{

    const user = await User.findById(uid);

    user.online =false;
    await user.save();
    return(user)

}


const getUsers = async ()=>{
    const users = await User
    .find()
    .sort();

    return users;
}
const getTickets = async () =>{
    const tickets = await Ticket.find();
    return tickets
}

const saveMessage = async(payload) =>{
    try{
        const message = new Message(payload)
        await message.save();
        return (message)
    }
    catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    userConected,
    userDesConected,
    getUsers,
    getTickets,
    saveMessage
}