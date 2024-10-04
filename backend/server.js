const getDb = require('./util/database').getDb;
const express = require('express');
const User = require('./models/User');
const mongoConnect = require('./util/database').mongoConnect;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/auth-user', (req, res, next) => {

    const { username, password } = req.body;
    const _db = getDb();
    _db.collection('users').findOne({ username: username })
        .then(result => {
            if (result == null) {
                res.json({ message: 'Invalid username or password' });
            } else if (result.password == password) {
                console.log("User found!!");
                res.json({ token: result._id + "#" + result.username })
            } else {
                res.json({ message: 'Invalid username or password' });
            }
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

app.use('/register-user', (req, res, next) => {

    const { username, password } = req.body;
    const _db = getDb();
    getDb().collection('users').findOne({ username: username })
        .then(result => {
            if (result) {
                res.json({ message: 'Username already exists' })
            } else {
                const user = new User(username, password);
                user.createUser();
                console.log("user cerated")
                res.json({ message: 'User Created!' })
            }
            next();
        })
        .catch(err => {
            console.log(err);
        })
});


mongoConnect(() => {
    app.listen(5000);
})

