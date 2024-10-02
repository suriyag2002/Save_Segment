// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle segment saving
app.post('/save-segment', async (req, res) => {
  try {
    const response = await axios.post('https://webhook.site/f2e0e751-6a16-46d7-94a7-4e485f350ab2', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving segment');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
