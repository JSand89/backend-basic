const { response } = require("express")
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { genJWT } = require("../helpers/jwt")

const newUser = async (req,res =response)=>{

    try{

        const{email, password}=req.body

        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg:'el correo ya existe'
            })
        }
        //save user
        const user = new User(req.body);

        // cryp pasword

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt )



        await user.save();

        //gen el jwt

        const token = await genJWT( user.id);
        res.json({
            ok:true,
            user,
            token
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
        
    }

}

//login

const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        //email exist?
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });          
        }

        //check password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password no encontrado'
            })
        }

        //generar el JWT

        const token = await genJWT(userDB.id);

        res.json({
            ok:true,
            user:userDB,
            token
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });

    }



}


//renewToken

const renewToken = async (req,res)=>{

    const uid = req.uid

    //gen new jwt

    const token =await genJWT(uid);

    // user info for uid

    const user = await User.findById( uid );

    res.json({
        ok:true,
        token,
        user
    })
}
module.exports ={
    newUser,
    login,
    renewToken
}