const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const port = 3000; 

// Models
const User = require('./models/user');

// Controllers
const authController = require('./controllers/authController');

// Routes
const authRouter = require('./routes/authRoute');


app.use(bodyParser.json()); // application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for x-www-form-urlencoded data <form>

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
});

app.use(authRouter);
app.use(User);

mongoose.connect('mongodb+srv://yididiya:mnYxZgzDQhULh2Ow@cluster0.de0jhxk.mongodb.net/shekilaStock-DB?retryWrites=true&w=majority').then(result=> {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  //  console.log(result);
  });
}).catch(err=> {
  console.log(err);
})
