const Ticket = require('../models/ticket');
const User = require('../models/user');


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

module.exports = {
    userConected,
    userDesConected,
    getUsers,
    getTickets
}