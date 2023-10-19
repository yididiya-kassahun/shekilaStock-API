const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

const User = require('../models/user');

exports.signIn = (req,res,next)=> {
  const userEmail = req.body.email;
  const userPass = req.body.pass;
  let loadedUser;

  User.findOne({ userEmail: userEmail })
    .then((user) => {
      console.log(user);
      if (!user) {
        console.log('incorrect user');
        return res.status(422).json({message:'user not found!'});
      }
       loadedUser = user;
        bcrypt
          .compare(userPass, user.userPass)
          .then((matched) => {
            if (matched) {
            const token = JWT.sign({userId:loadedUser._id.toString(),userName:loadedUser.userName},'secret',{expiresIn: '5h'});
            
            return res.status(200).json({message:'auth work!',token:token,userId:loadedUser._id.toString(),userName:loadedUser.userName});
            }else{
              return res.json({message:"incorrect password provided"});
            }});
       
    });
}

exports.signUp = (req,res,next) => {
  const userName = req.body.uName;
  const userEmail = req.body.uEmail;
  const userPass =  req.body.uPass;

  return bcrypt
  .hash(userPass, 12)
  .then((hashedPassword) => {
    const user = new User({
      userName: userName,
      userEmail: userEmail,
      userPass: hashedPassword,
    });
    user.save()
      .then(result=>{
        console.log(result);
      return res.status(201).json({
        message:'auth work!',
        data:[result]});
    }).catch(err=>{
      console.log(err);
    })
  }).catch(err=>{console.log(err)});
}