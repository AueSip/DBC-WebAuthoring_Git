const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10, 
    host        : '127.0.0.1',
    user        : 'root',
    password    : 'root',
    database    : 'portfoliosite'
});

module.exports.pool = pool;


var list = {};
app.get("/home", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);;', function(err,result){
            if(err){
                throw err;
            } else {
            
                console.log(result);
              
                

                list = {listResults: result}; 
                
               
                res.render('index.ejs', list);  
                           
            }
        })

        
});

app.listen(3000, () => console.log('Server running on port 3000'));