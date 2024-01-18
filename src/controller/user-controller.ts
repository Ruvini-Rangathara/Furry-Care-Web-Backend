import userSchema from '../model/user-model';
import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";
import {Request, Response} from "express";
import Pet from "../model/pet-model";
const salt=10;

export const register = (req:any,resp:any) => {

    userSchema.findOne({'username':req.body.username}).then(result=>{
        if(result==null){
            bcrypt.hash(req.body.password,salt,function (err,hash) {
                if (err){
                    return resp.status(500).json(err);
                }
                const user = new userSchema({
                    username:req.body.username,
                    password:hash,
                    activeState:true
                });

                // const transporter= nodemailer.createTransport({
                //     service:'gmail',
                //     auth:{
                //         user:'testdevstackemail@gmail.com',
                //         pass:'jxdo sqxg szag keuu',
                //     }
                // });

                // const mailOption={
                //     from:'testdevstackemail@gmail.com',
                //     to:req.body.email,
                //     subject:'New Account Creation',
                //     text:'You have Created Your Account!'
                // }
                // transporter.sendMail(mailOption, function (error, info) {
                //     if (error){
                //         return resp.status(500).json({'error':error});
                //     }else{
                //         user.save().then(saveResponse=>{
                //             return resp.status(201).json({'message':'Saved!'});
                //         }).catch(error=>{
                //             return resp.status(500).json(error);
                //         });
                //     }
                // })
            })
        }else{
            return resp.status(409).json({'error':'already exists!'});
        }
    })


}
export const login = (req:any,resp:any) => {
    userSchema.findOne({'username':req.body.username}).then(selectedUser=>{
        if (selectedUser!==null){
            bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
                if (err){
                    return resp.status(500).json({'message':'internal server error'});
                }

                if(result){
                    const payload={
                        // email:selectedUser.email
                    }

                    const secretKey:any=process.env.SECRET_KEY;
                    const expiresIn='24h';

                    const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});
                    return resp.status(200).json(token);
                }else{
                    return resp.status(401).json({'message':'Password is incorrect!'});
                }
            });
        }else{
            return resp.status(404).json({'message':'not found!'});
        }
    });
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userSchema.find().sort({name: 1});
        res.json(users);
        console.log("Users:", users.toString());
    } catch (err) {
        res.status(500).json({message: 'Error while getting users'});
        console.error('Error while getting pets:', err);
    }
};


export const addUser = async (req: Request, res: Response) => {
    console.log("add user! in backend");
    const user = new userSchema({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        activeState: req.body.activeState,
    });

    try {
        const savedUser = await user.save();
        console.log("save user!")
        res.json(savedUser);
    } catch (err) {
        res.json({message: err});
        console.log("can not save user! ", err)
    }
}