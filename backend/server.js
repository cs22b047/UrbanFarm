const getDb = require('./util/database').getDb;
const express = require('express');
const User = require('./models/User');
const Blog = require('./models/Blog');
const mongoConnect = require('./util/database').mongoConnect;
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');  // Import uuid for unique filenames


const app = express();

app.use(cors());
app.use(express.json());



// Your Trefle API key (replace with your own API key)
const TREFLE_KEY1 = 'gDA0n_wM3Z9'
const TREFLE_KEY2 = 'GKU4Ak9EF23mXz'
const TREFLE_KEY3 = 'YR5iiZUBP_'
const TREFLE_KEY4 = 'y3hNQsQk'

const TREFLE_API_KEY = TREFLE_KEY1+TREFLE_KEY2+TREFLE_KEY3+TREFLE_KEY4;


// Endpoint to fetch plant data from Trefle API
app.get('/plants', async (req, res) => {
    try {
        // Example request to fetch plant data from Trefle API
        const response = await axios.get('https://trefle.io/api/v1/plants', {
            params: {
                'filter[distribution]': 'asia-tropical',
                token: TREFLE_API_KEY,
                // page_size: 1 
            }
        });

        // Return the data to the client
        res.json(response.data.data);
    } catch (error) {
        console.error('Error fetching plants from Trefle API:', error);
        res.status(500).json({ error: 'Failed to retrieve plant data from Trefle API.' });
    }
});

// // Set up multer for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // Specify the folder to store images
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = uuidv4() + path.extname(file.originalname); // Generate unique filename
//         cb(null, uniqueName);  // Save file with unique name
//     }
// });

// const upload = multer({ storage: storage });

// Add blog route (with file upload)
app.post('/add-blog', (req, res) => {
    const { title, content, author, photolink } = req.body;

    if (!title || !content || !photolink) {
        return res.status(400).json({ message: 'Title, content, and photo are required.' });
    }

    const blog = new Blog(title, content, photolink, author);
    blog.save()
        .then(result => {
            res.json({ message: 'Blog created successfully!' });
        })
        .catch(err => {
            console.error('Error saving blog:', err);
            res.status(500).json({ message: 'Failed to create blog.' });
        });
});

app.get('/blogs', (req, res) => {
    const searchQuery = req.query.search;

    if (searchQuery) {
        // Fetch blogs that match the search query in their content
        Blog.fetchByMatchingTitle(searchQuery)
            .then(blogs => res.json(blogs))
            .catch(err => {
                console.error('Error fetching blogs:', err);
                res.status(500).json({ message: 'Failed to retrieve matching blogs.' });
            });
    } else {
        // Fetch all blogs if no search query is provided
        Blog.fetchAll()
            .then(blogs => res.json(blogs))
            .catch(err => {
                console.error('Error fetching blogs:', err);
                res.status(500).json({ message: 'Failed to retrieve blogs.' });
            });
    }
});

app.get('/get-blog', (req, res) => {
    const blogId = req.query.id;
    Blog.findById(blogId)
        .then(blog =>{ res.json(blog)})
        .catch(err => {
            console.error('Error fetching blog:', err);
            res.status(500).json({ message: 'Failed to retrieving blog.' });
        });

})


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
                res.json({ message: 'Username already exists', token: 409 })
            } else {
                const user = new User(username, password, name);
                user.createUser();
                console.log("user cerated")
                res.json({ message: 'User Created!', token: 200 })
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

app.post('/chat', async (req, res, next) => {
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
        console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again later.' });
    }
    next();
});



// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoConnect(() => {
    app.listen(8080);
})

