const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000; 

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
