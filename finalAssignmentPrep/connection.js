const fs = require('fs');
const path = require('path');

class Connection {
    constructor() {
        this.filepath = path.join(__dirname, 'peoples.json');
    }

    readData(){
        const data = fs.readFileSync(this.filepath, 'utf8');
        return JSON.parse(data);
    }

    writeData(){
        const data = JSON.stringify(this.data, null, 2);
        fs.writeFileSync(this.filepath, data, 'utf8');
    }
}
module.exports = Connection;