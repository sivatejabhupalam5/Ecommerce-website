const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://127.0.0.1:5501',  // your AngularJS app's URL
    methods: ['GET', 'POST', 'OPTIONS'],  // allowed HTTP methods
    allowedHeaders: ['Content-Type'],    // allowed headers
}));

app.post('/api/UserRegistration', (req, res) => {
  // Your registration logic here
});

app.listen(5236, () => {
  console.log('Server running on port 5236');
});
