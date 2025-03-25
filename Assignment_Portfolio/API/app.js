const express = require('express');
const session = require('express-session');
const datarecieved = require('./datarecieved');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

const datacheck = new datarecieved();
// Middleware
const storage = multer.diskStorage({
    destination: 'Images/',
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        // Remove the original extension and append .png
        const baseName = file.uploadedName;
        cb(null, `${baseName}.png`);
    }
});

const upload = multer({ storage: storage });


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.set('view engine', 'ejs'); // Set the template engine


app.use(express.static('Style')); 
app.use(express.static('Images')); 

var mysql = require('mysql2');


var pool = mysql.createPool({
    connectionLimit : 10, 
    host        : '127.0.0.1',
    user        : 'root',
    password    : 'root',
    database    : 'portfoliosite',
    multipleStatements: true
});

module.exports.pool = pool;


var list = {};
app.get("/home", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);', function(err,result){
            if(err){
                throw err;
            } else {
            
                console.log(result);
                list = {listResults: result}; 
                res.render('index.ejs', list);           
            }
        })
});

app.get("/portfolios", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);', function(err,result){
            if(err){
                throw err;
            } else {
        
                console.log(result);
                list = {listResults: result}; 
                res.render('portfolios.ejs', list);           
            }
        })
});

app.get("/previousworks", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);', function(err,result){
            if(err){
                throw err;
            } else {
            
                console.log(result);
                list = {listResults: result}; 
                res.render('previousworks.ejs', list);           
            }
        })
});

app.get("/about", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);', function(err,result){
            if(err){
                throw err;
            } else {
            
                console.log(result);
                list = {listResults: result}; 
                res.render('about.ejs', list);           
            }
        })
});

app.get("/contact", function(req,res){
    pool.query('select title,maindescription,shortdescription, (select skill from skill where SkillID = firstskillid ) as firstskill,(select skill from skill where SkillID = secondskillid ) as secondskill,(select skill from skill where SkillID = thirdskillid ) as thirdskill,(select skill from skill where SkillID = fourthskillid ) as fourthskill,(select keynote from keynote where KeyNoteID = firstkeynoteid ) as firstkeynote,(select keynote from keynote where KeyNoteID = secondkeynoteid ) as secondkeynote,(select keynote from keynote where KeyNoteID = thirdkeynoteid ) as thirdkeynote,(select keynote from keynote where KeyNoteID = fourthkeynoteid ) as fourthkeynote,(select category from category where CategoryID = portfolio.categoryid) as category,(select portfoliotype from portfoliotype where portfolio.portfoliotypeid = portfoliotypeid ) as PortfolioType,(select location from location where locationid = portfolio.locationid ) as Location,(select imagenormal from imagenormal where imagenormalid = portfolio.imagenormalid ) as ImageNormal,(select imagesquare from imagesquare where imagesquareid = portfolio.imagesquareid ) as ImageSquare from portfolio inner join skill,keynote,category,portfoliotype,location,imagenormal,imagesquare  where id and (skill.SkillId = 1 and keynote.KeyNoteID  = 1 and category.CategoryID = 1 and portfoliotype.PortfolioTypeID  = 1 and location.LocationID = 1 and imagenormal.ImageNormalID  = 1 and imagesquare.ImageSquareID = 1);', function(err,result){
            if(err){
                throw err;
            } else {
            
                console.log(result);
                list = {listResults: result}; 
                res.render('contact.ejs', list);           
            }
        })
});

app.post("/add/portfolio",function(req,res){

    const newData = {
        title: req.body.title,
        maindescription: req.body.mainDesc,
        shortdescription: req.body.shortDesc,
        firstskillid: datacheck.checkData(req.body.firstskillID),
        secondskillid: datacheck.checkData(req.body.secondskillID),
        thirdskillid: datacheck.checkData(req.body.thirdskillID),
        fourthskillid: datacheck.checkData(req.body.fourthskillID),
        firstkeynoteid: datacheck.checkData(req.body.firstkeynoteID),
        secondkeynoteid : datacheck.checkData(req.body.secondkeynoteID),
        thirdkeynoteid : datacheck.checkData(req.body.thirdkeynoteID),
        fourthkeynoteid : datacheck.checkData(req.body.fourthkeynoteID),
        categoryid : datacheck.checkData(req.body.categoryID),
        portfoliotypeid : datacheck.checkData(req.body.portfoliotypeID),
        locationid : datacheck.checkData(req.body.locationID),
        imagenormalid : datacheck.checkData(req.body.imageNormalID),
        imagesquareid : datacheck.checkData(req.body.imageSquareID),
    };

    console.log(newData)


    pool.query('insert into portfolio(title,maindescription,shortdescription,firstskillid,secondskillid,thirdskillid,fourthskillid,firstkeynoteid,secondkeynoteid,thirdkeynoteid,fourthkeynoteid,categoryid,portfoliotypeid,locationid,imagenormalid,imagesquareid) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?);', [newData.title, newData.maindescription, newData.shortdescription, newData.firstskillid, newData.secondskillid, newData.thirdskillid, newData.fourthskillid, newData.firstkeynoteid, newData.secondkeynoteid, newData.thirdkeynoteid, newData.fourthkeynoteid, newData.categoryid, newData.portfoliotypeid, newData.locationid, newData.imagenormalid, newData.imagesquareid], function(err, result){
        if(err){
            throw err;
        }
        else{
            res.json(result)
            console.log("Portfolio was added")
        }
    });
});

app.post("/update/portfolio",function(req,res){

    const newData = {
        title: req.body.title,
        maindescription: req.body.mainDesc,
        shortdescription: req.body.shortDesc,
        firstskillid: datacheck.checkData(req.body.firstskillID),
        secondskillid: datacheck.checkData(req.body.secondskillID),
        thirdskillid: datacheck.checkData(req.body.thirdskillID),
        fourthskillid: datacheck.checkData(req.body.fourthskillID),
        firstkeynoteid: datacheck.checkData(req.body.firstkeynoteID),
        secondkeynoteid : datacheck.checkData(req.body.secondkeynoteID),
        thirdkeynoteid : datacheck.checkData(req.body.thirdkeynoteID),
        fourthkeynoteid : datacheck.checkData(req.body.fourthkeynoteID),
        categoryid : datacheck.checkData(req.body.categoryID),
        portfoliotypeid : datacheck.checkData(req.body.portfoliotypeID),
        locationid : datacheck.checkData(req.body.locationID),
        imagenormalid : datacheck.checkData(req.body.imageNormalID),
        imagesquareid : datacheck.checkData(req.body.imageSquareID),
    };

    console.log(newData)

    pool.query('UPDATE portfolio set maindescription = ?,shortdescription = ?,firstskillid = ?,secondskillid = ?,thirdskillid = ?,fourthskillid = ?,firstkeynoteid = ?,secondkeynoteid = ?,thirdkeynoteid = ?,fourthkeynoteid = ?,categoryid = ?,portfoliotypeid = ?,locationid = ?,imagenormalid = ?,imagesquareid = ?  where title = ?;', [ newData.maindescription, newData.shortdescription, newData.firstskillid, newData.secondskillid, newData.thirdskillid, newData.fourthskillid, newData.firstkeynoteid, newData.secondkeynoteid, newData.thirdkeynoteid,newData.fourthkeynoteid, newData.categoryid, newData.portfoliotypeid, newData.locationid,newData.imagenormalid, newData.imagesquareid, newData.title], function(err, result){
        if(err){
            throw err;
        }
        else{
            res.json(result)
            console.log("Portfolio was updated")
        }
    });

});

app.post("/delete/portfolio",function(req,res){
    const newData = {
        title: req.body.title,
    };
    pool.query('DELETE FROM portfolio WHERE title = ?;', [newData.title], function(err, result){
        if(err){
            throw err;
        }
        else{
            res.json(result)
            console.log("Portfolio was deleted")
        }
    });
});



app.post("/add/information", function(req,res){
    pool.query('SELECT * FROM Skill; SELECT * FROM keynote; SELECT * FROM category; SELECT * FROM portfoliotype; SELECT * FROM location;', function(err, result){
        if(err){
            throw err;
        } else {

            list = {skills: result[0], keynotes: result[1], categories: result[2], portfoliotypes: result[3], locations: result[4],}

            const newData = {
                skill: req.body.skill,
                keynote: req.body.keynote,
                category: req.body.category,
                portfoliotype: req.body.portfoliotype,
                location: req.body.location,
            };
    
                if (datacheck.checkSkill(list, newData)){
                    pool.query('INSERT into skill (Skill) values(?);', [newData.skill], function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("Skill was added")
                        }
                    });
                }

                if (datacheck.checkKeynote(list, newData)){
                    pool.query('INSERT into keynote (Keynote) values(?);', [newData.keynote], function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("Keynote was added")
                        }
                    });
                }

                if (datacheck.checkCategory(list, newData)){
                    pool.query('INSERT into category (Category) values(?);', [newData.category], function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("Category was added")
                        }
                    });
                }

                if (datacheck.checkPortfolioType(list, newData)){
                    pool.query('INSERT into portfoliotype (Portfoliotype) values(?);', [newData.portfoliotype], function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("PortfolioType was added")
                        }
                    });
                }

                if (datacheck.checkLocation(list, newData)){
                    pool.query('INSERT into location (Location) values(?);', [newData.location], function(err, result){
                        if(err){
                            throw err;
                        }
                        else{
                            console.log("Location was added")
                        }
                    });
                }
        }
    });
           
});

app.get("/get/information", function(req,res){
    pool.query('SELECT * FROM category; SELECT * FROM portfoliotype; SELECT * FROM location;', function(err, result){
        if(err){
            throw err;
        } else {
            console.log(result);
            list = {listResults: result[0], listResults1: result[1], listResults2: result[2]};
        }
    });
});

app.get("/get/tables", function(req,res){
    console.log("Requested")
    pool.query('SELECT * FROM Skill; SELECT * FROM keynote; SELECT * FROM category; SELECT * FROM portfoliotype; SELECT * FROM location; SELECT * FROM imagenormal; SELECT * FROM imagesquare; SELECT title FROM portfolio;', function(err, result){
        if(err){
            throw err;
        } else {
            list = {skills: result[0], keynotes: result[1], categories: result[2], portfoliotypes: result[3], locations: result[4],imagenormals: result[5], imagesquares: result[6], titles: result[7]};
            console.log(list.imagesquares);
            res.json(list);
        }
    });
});




app.post('/add/images', upload.array('image', 2), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'No files were uploaded'
            });
        }

        // Process the uploaded files
        const uploadedFiles = req.files.map(file => ({
            originalName: file.originalname,
            uploadedName: file.filename,
            size: file.size,
            path: file.path
        }));

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            data: uploadedFiles
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading files',
            error: error.message
        });
    }
});





app.listen(3000, '10.104.82.57', () => console.log('Server running on port 3000'));