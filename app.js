const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const filesDir = path.join(__dirname, 'files');

// Home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1><p>Go to <a href="/files">/files</a> to browse files.</p>');
});

// File browser: list all files in /files
app.get('/files', (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to read files directory.');
    }

    const list = files.map(file => `<li><a href="/files/${file}">${file}</a></li>`).join('');
    res.send(`<h2>Files</h2><ul>${list}</ul>`);
  });
});

// Serve any file from /files folder
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found.');
    }
    res.sendFile(filePath);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
