const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000; 


const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=> {
    cb(null,'public/uploads')
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
})

const fileFilter = (req,file,cb)=> {
  if(file.mimetype === 'image/png'||file.mimetype === 'image/jpg'||file.mimetype === 'image/jpeg'||file.mimetype === 'image/webp'){
       cb(null,true);
  }else{
    cb(null,false);
  }
}

// Models
const User = require('./models/user');
const Product = require('./models/product');

// Controllers
const authController = require('./controllers/authController');

// Routes
const authRouter = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');

app.use(bodyParser.json()); // application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for x-www-form-urlencoded data <form>
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));

 
//  app.use(express.static('public/uploads/'));
app.use(express.static('public'));

//app.use('public/uploads',express.static(path.join(__dirname,'public/uploads')));

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
});

app.use(authRouter);
app.use(productRoute);
app.use(User);
app.use(Product);

mongoose.connect('mongodb+srv://yididiya:mnYxZgzDQhULh2Ow@cluster0.de0jhxk.mongodb.net/shekilaStock-DB?retryWrites=true&w=majority').then(result=> {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  //  console.log(result);
  });
}).catch(err=> {
  console.log(err);
})
