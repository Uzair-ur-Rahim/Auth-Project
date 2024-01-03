import UserModel from "../models/user.js";
import bcrypt from 'bcryptjs';
import {genHashedPassword, comparePassword } from '../helper/auth.js'
import jwt  from "jsonwebtoken";

export const test = (req,res)=>{
    res.json("test is working")
}


export const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name){
            return res.json({error: "Please Enter Name"})
        }
        
        if(!email){
            return res.json({error: "Please Enter Email"})
        }
        if(!password || password.length < 8){
            return res.json({error: "Please Enter password and make sure it's at least 8 character long"})
        }

        const existEmail = await UserModel.findOne({email});
        if (existEmail){
            return res.json({
                error: "Email already registered"
            })
        }
            //Bcrypt using this 2 lines or make another file 
        // const salt = await bcrypt.genSalt(12);
        // const hashPassword = await bcrypt.hash(password, salt);
        const hashPassword = await genHashedPassword(password);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashPassword
        })
        return res.json(newUser);
                // FOR SAVING IN DATABSE Way 1
        // const NewUser = new UserModel({
        //     name,
        //     email,
        //     password
        // })
        // await NewUser.save()
        // res.status(201).json({message: "User registration Successfull"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// Login API

export const loginUser = async (req, res) => {
        try {
            const {email, password} = req.body;
            const existEmail = await UserModel.findOne({email}) 
            if(!existEmail){
                return res.json({error:"User not exist"})
            }
            // if (!existEmail.password) {
            //    return res.json({ error: "Password not set for the user" });
            // }
            // compare password using direct 1 way
            // const match = await bcrypt.compare(password, existEmail.password)
            
            //compare Password using function decleared in auth file
            const hashpassword = existEmail.password;
            const match = await comparePassword(password, hashpassword)
            if(match){
                jwt.sign({email: existEmail.email, id: existEmail._id, name: existEmail.name}, process.env.JWT_SECRET, {}, (err, token)=>{
                    if(err){
                        throw err;
                    }
                    
                    res.cookie("token", token).json(existEmail);
                })
            }
            if(!match){
                res.json({error: "Please Enter correct password"})
            }
        } catch (error) {
            console.log(error)
        }
}


export const getProfile = (req, res) =>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>{
            if(err){
                throw err
            }
            res.json(user);
        }) 
        }else {
            res.json(null)

    }


}