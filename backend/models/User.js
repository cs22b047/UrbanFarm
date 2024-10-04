const getDb = require('../util/database').getDb;

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
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