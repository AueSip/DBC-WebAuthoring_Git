const Connection = require('./connection');
const fs = require('fs');
const path = require('path')
class People extends Connection{
    constructor(){
        super();
    }
    getAllPeople(){
        return this.readData();
    }

    getOneReview(reviewID){
        const person = this.readData().filter(item => item.id == reviewID)
        return person;
    }
    
    addNewPerson(peoples, newPerson){
        peoples.push(newPerson);
        this.writePeople(peoples);
    }

    writePeople(data){
        fs.writeFileSync("./peoples.json", JSON.stringify(data, null, 2), 'utf-8');
      };
    
}
module.exports = People;