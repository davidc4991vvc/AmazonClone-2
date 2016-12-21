var express = require('express');
var morgan = require('morgan');

var app = express();

//Middleware for morgan
app.use(morgan('dev'));

app.get('/',function(req,res){
  res.json("My name is Sumair");
});

app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running on port 3000");
});
