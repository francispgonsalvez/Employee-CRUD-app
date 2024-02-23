const asyncHandler = require('express-async-handler');
const userModel = require('../models/usermodels');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// 

    const regUser = asyncHandler(async(req,res)=>{
        const {email,password}=req.body;
        if(!email||!password){
            res.status(400) 
            
            throw new Error("all fields are mandatory");
        }
        const userAvailable = await userModel.findOne({email});
        if(userAvailable){
            res.status(400);
            throw new Error("user already registered");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const user = await userModel.create({
            email,password:hashedPassword
        })
        console.log(`user created ${user}`)
        if(user){
            res.redirect('/')
            // res.status(201).json({_id:user.id,email:user.email})
        }else{
            res.status(400);
            throw new Error("user data not valid");
        }
        res.json({message :"register the user"}) 
    });

//============================================================= 
const logUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are mandatory" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            // return res.status(401).json({ error: "User not found" });
            res.redirect('/')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // return res.status(401).json({ error: "Incorrect password" });
            res.redirect('/')
           
  
        }
        req.session.userId = user._id; // Store user ID in the session
        res.redirect('/main');
 
        // res.redirect('/main');
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });  
    }
});



module.exports = {regUser,logUser}