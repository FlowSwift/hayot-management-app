const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const httpsOptions = {
  cert: fs.readFileSync('/etc/letsencrypt/live/manage.prins-israel.co.il/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/manage.prins-israel.co.il/privkey.pem')
};

// Create the HTTPS server
const server = https.createServer(httpsOptions, app);

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
