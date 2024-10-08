const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Replace this with your actual OpenAI API key
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

app.post('/chat', async (req, res) => {
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
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
