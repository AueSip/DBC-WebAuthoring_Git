var express = require("express");
const People = require('./people');
var app = express();


const peopleInstance = new People();

app.set('view engine', 'ejs'); // Set the template engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
const fs = require('fs');


app.use(express.static(path.join(__dirname, `Style`))); 
app.use(express.static(path.join(__dirname, `Images`))); 





// **********************************  Code from here **************************
app.get('/', function(req,res){
    const peoples = peopleInstance.getAllPeople();
    res.render('index', {peoples})
})


//
app.get('/about', function(req,res){
    res.render('about')  
})


//
app.get('/portfolio', function(req,res){
    res.render('portfolio')  
})


//
app.get('/contact', function(req,res){
    res.render('contact')  
})


//
app.get('/reviews', function(req,res){
    const peoples = peopleInstance.getAllPeople();
    res.render('reviews', {peoples})
})

//
app.get('/reviews/json', function(req, res) {
    const filePath = path.join(__dirname, 'peoples.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error("Error parsing JSON data:", parseErr);
            res.status(500).send("Internal Server Error");
        }
    });
});


//
app.get('/reviews/retrieve/person/user/:id', function(req,res){
    var reviewId = req.params.id
    const peoples = peopleInstance.getOneReview(reviewId);
    console.log(peoples)
    res.render("thisReview", {peoples})
})


//
app.get('/error', function(req,res){
    res.render('error')  
})

//
app.post('/reviews/add', function(req,res){
        const peoples = peopleInstance.getAllPeople();

        var xxx = parseInt(req.body.age)
        const newPerson = {
          id: peoples.length ? peoples[peoples.length - 1].id + 1 : 1,
          name: req.body.name,
          surname: req.body.surname,
          age: xxx,
        };
        if (!newPerson.name || !newPerson.surname || !newPerson.age) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        peopleInstance.addNewPerson(peoples, newPerson);  // Write the updated list of people to the storage/file
        
        res.status(201);
        res.json(newPerson);

})

app.delete('/reviews/json/:id', (req, res) => {
    const peoples = peopleInstance.getAllPeople();
    const peopleIndex = peoples.findIndex((m) => m.id === parseInt(req.params.id));
  
    if (peopleIndex === -1) return res.status(404).json({ message: 'Person not found' });
  
    const deletedPerson = peoples.splice(peopleIndex, 1);
    peopleInstance.writePeople(peoples);
  
    res.json(deletedPerson);
  });



app.use((req, res, next) => {
    res.status(404);
    res.redirect('/error')
});












// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "192.168.152.78" , function(){
  console.log("New Full Demo is Live")
});