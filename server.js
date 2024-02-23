const express = require('express');
const cors =require('cors');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const dbConnect = require('./config/dbconnection')
const errorHandler = require('./errorHandler/error');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser')
const Employee = require('./models/empmodels');
   


dbConnect();
const app = express(); 
// app.use(express.urlencoded({extended:false})); 
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 3002; 

app.use(
  session({
      secret: "key that will sign cookie",
      resave: false,
      saveUninitialized: false,
  }) 
);


app.get('/main', (req, res) => {
  console.log(req.session.userId)
  if (req.session.userId) {
    console.log(req.session.id)
    res.render('main');
  } else {
    res.redirect('/login');
  }
});

app.use(express.json());
app.use(cors()); 
app.use('/api/employees',require('./routes/emproute'));
app.use('/api/users'   ,require('./routes/userroute'))




app.use(errorHandler);

app.set("view engine","ejs");

app.use(express.static("uploads"));
app.use('/css',express.static(path.resolve(__dirname,"Assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"Assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"Assets/js")));
app.use('/uploads',express.static(path.resolve(__dirname,"uploads")));
app.set('views', path.join(__dirname, 'views'));
 



app.get('/register', (req,res) => {
  res.render('register'); 
})

app.get('/', (req,res) => {
  res.render('login'); 
})
app.get('/login', (req,res) => {
  res.render('login'); 
})

  app.get('/logout', (req, res) => {
    // req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/');
    
    });
  });
  

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
}); 