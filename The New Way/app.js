var express = require("express");
var app = express();


app.set('view engine', 'ejs'); // Set the template engine


app.use(express.static('Style')); 
app.use(express.static('Images')); 





// **********************************  Code from here **************************
app.get('/', function(req,res){
    res.render('index')  
   
   
})

app.get('/about', function(req,res){
    res.render('index')  
})

app.get('/error', function(req,res){
    res.render('error')  
})



app.use((req, res, next) => {
    res.status(404);
    res.redirect('/error');
});










// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});