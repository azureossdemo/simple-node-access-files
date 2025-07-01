const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1><p>Go to <a href="/files/test.txt">/files/test.txt</a></p>');
});

// Route to serve the test.txt file
app.get('/files/test.txt', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'test.txt');

  // Check if file exists and send it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.sendFile(filePath);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
