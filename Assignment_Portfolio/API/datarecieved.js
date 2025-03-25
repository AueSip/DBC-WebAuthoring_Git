const Connection = require('./connection');
const fs = require('fs');
const path = require('path')
class DataRecieved extends Connection{
    constructor(){
        super();
    }
    getAllData(data){
        return this.readData(data);
    }

    getOneReview(reviewID){
        const person = this.readData().filter(item => item.id == reviewID)
        return person;
    }
    
    addNewPerson(peoples, newPerson){
        peoples.push(newPerson);
        this.writePeople(peoples);
    }

    checkSkill(list, newData){
        var isSkillReal = true;
        if (newData.skill == "" || newData.skill == null){
            isSkillReal = false;
        } 
        else {

                    for (var i = 0; i < list.skills.length; i++){
                        if (newData.skill == list.skills[i].Skill){
                            console.log("Skill Exists")
                            isSkillReal = false;
                            break;
                        }  
                     }
             }
        return isSkillReal;
    }

                    
    checkKeynote(list, newData){
        var isSkillReal = true;
        if (newData.keynote == "" || newData.keynote == null){
            isSkillReal = false;
        } 
        else {

                    for (var i = 0; i < list.keynotes.length; i++){
                        if (newData.keynote == list.keynotes[i].KeyNote){
                            console.log("Skill Exists")
                            isSkillReal = false;
                            break;
                        }  
                     }
             }
        return isSkillReal;
    }

        checkCategory(list, newData){
            var isSkillReal = true;
        if (newData.category == "" || newData.category == null){
            isSkillReal = false;
        } 
        else {

                    for (var i = 0; i < list.categories.length; i++){
                        if (newData.category == list.categories[i].Category){
                            console.log("Skill Exists")
                            isSkillReal = false;
                            break;
                        }  
                     }
             }
        return isSkillReal;
    }

            checkPortfolioType(list, newData){
                var isSkillReal = true;
        if (newData.portfoliotype == "" || newData.portfoliotype == null){
            isSkillReal = false;
        } 
        else {

                    for (var i = 0; i < list.portfoliotypes.length; i++){
                        if (newData.portfoliotype == list.portfoliotypes[i].PortfolioType){
                            console.log("Skill Exists")
                            isSkillReal = false;
                            break;
                        }  
                     }
             }
        return isSkillReal;
    }
                checkLocation(list, newData){
                    var isSkillReal = true;
                    if (newData.location == "" || newData.location == null){
                        isSkillReal = false;
                    } 
                    else {
            
                                for (var i = 0; i < list.locations.length; i++){
                                    if (newData.location == list.locations[i].Location){
                                        console.log("Skill Exists")
                                        isSkillReal = false;
                                        break;
                                    }  
                                 }
                         }
                    return isSkillReal;
                }

                checkData(data){
                    if (parseInt(data) != NaN){
                        return data;
                    }else return null


                }






    }

module.exports = DataRecieved;