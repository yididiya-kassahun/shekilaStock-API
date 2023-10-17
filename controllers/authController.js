exports.signIn = (req,res,next)=> {
   const userEmail = req.body.email;
   const userPass =  req.body.password;
   console.log(userEmail,userPass);
  return res.status(201).json({message:'auth work!',data:{userEmail:userEmail,userPass:userPass}});
}

exports.signUp = (req,res,next) => {
  const userEmail = req.body.uEmail;
  const userPass =  req.body.uPassword;
  const userPhone =  req.body.uPhone;

  return res.status(201).json({message:'auth work!',data:{userEmail:userEmail,userPass:userPass,userPhone:uPhone}});
}