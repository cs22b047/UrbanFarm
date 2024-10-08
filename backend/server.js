const getDb = require('./util/database').getDb;
const express = require('express');
const User = require('./models/User');
const mongoConnect = require('./util/database').mongoConnect;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');


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
                res.json({ token: result._id + "#" + result.name })
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

    const { username, password, name } = req.body;
    const _db = getDb();
    getDb().collection('users').findOne({ username: username })
        .then(result => {
            if (result) {
                res.json({ message: 'Username already exists' , token: 409})
            } else {
                const user = new User(username, password,name);
                user.createUser();
                console.log("user cerated")
                res.json({ message: 'User Created!',token: 200})
            }
            next();
        })
        .catch(err => {
            console.log(err);
        })
});



//chat bot

const OPENAI_API_KEY = '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';

// Function to search for keywords in the files
function searchFiles(query) {
    const directoryPath = path.join(__dirname, 'data');
    let results = [];

    // Read the directory and filter for text files
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.txt'));

    // Search in each file
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Check if the query matches the content of the file
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push({ file, content });
        }
    }

    return results;
}

app.post('/chat', async (req, res,next) => {
    const userMessage = req.body.message;

    // Check if the message is a search query
    if (userMessage.startsWith("search:")) {
        const query = userMessage.replace("search:", "").trim();
        const searchResults = searchFiles(query);

        if (searchResults.length > 0) {
            const reply = searchResults.map(result => `Found in ${result.file}:\n${result.content}`).join('\n\n');
            return res.json({ reply });
        } else {
            return res.json({ reply: 'No results found for your query.' });
        }
    }

    // If it's not a search query, use GPT-4
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botResponse = response.data.choices[0].message.content;
        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again later.' });
    }
    next();
});

mongoConnect(() => {
    app.listen(8080);
})

