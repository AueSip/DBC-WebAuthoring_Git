const fs = require('fs');


class Connection {
    constructor() {
        
    }

    readData(data){
        return JSON.parse(data);
    }

}
module.exports = Connection;