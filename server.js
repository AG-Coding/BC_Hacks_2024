const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OAuth2Client } = require('google-auth-library');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb+srv://tom564tom:7ycl8HbAZ4i9aL2l@cluster0.nf4tb9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const mongoUrl = 'mongodb+srv://tom564tom:<password>@cluster0.nf4tb9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
    //change to ur name
    const db = client.db('Cluster0');
    //const users = db.collection('users');
    //app.locals.users = users;
});
//XmYRz8FGjWBU5mBW 
// Access your API key as an environment variable
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error('API_KEY is not set. Please set the API_KEY environment variable.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//28:50
async function verify(client, token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/gauthenticate', async (req, res) => {
    var token = req.query.token;
    const client = new OAuth2Client(CLIENT_ID);
    var x = await verify(client, token).catch(console.error);
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