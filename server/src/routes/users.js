const express=require("express");
const jwt=require("jsonwebtoken")

const router=express.Router()
const UserModel=require("../models/Users.js");
router.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    
     const user=await UserModel.findOne({username:username})
     if(user){
        return res.json({message:"user already exists"})
     }
     
     const newuser=new UserModel({username,password})
     await newuser.save()
     res.json({message:"user registered successfully"})
})
router.post("/login",async function(req,res){
const {username,password}=req.body;
const user=await UserModel.findOne({username:username})
if(!user){
    return res.json({message:"user does not exsists"});
}

if(password!=user.password){
    return res.json({message:"username or password is Incorrect"});
}
const token=jwt.sign({id:user._id},"secret")
res.json({token,userId:user._id})
})
module.exports = router;
/*
 const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
    jwt.verify(token, "secret", (err) => {
    if (err) return res.sendStatus(403);
    next ();
    });
    } else {
    res.sendStatus(401);
    }
}
module.exports=verifyToken;
*/