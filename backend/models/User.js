const getDb = require('../util/database').getDb;

class User {
    constructor(username, password,name) {
        this.username = username;
        this.password = password;
        this.name = name;

    }
    createUser() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then()
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;