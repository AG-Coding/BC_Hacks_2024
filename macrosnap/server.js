const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error('API_KEY is not set. Please set the API_KEY environment variable.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/generate-content', async (req, res) => {
    const exampleFood = {
        "oranges": " 1 medium",
        "apples": "2 large",
        "bananas": "3 large"
    };

    const exampleFoodString = JSON.stringify(exampleFood);
    const promptStart = "Pretend you're a registered dietition. Please help me track my daily nutrient and calorie intake. Provide me with insights based on the foods I've eaten throughout the day. Identify any nutrients or calories I have overeaten and suggest adjustments to optimize my diet for better workouts and improved productivity. Here's the list of foods I consumed today:";

    try {

        const result = await model.generateContent(promptStart + exampleFoodString);
        const response = await result.response;
        const text = response.text();  // Ensure this is a function call
        res.json({ content: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'An error occurred while generating content' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
