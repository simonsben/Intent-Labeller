const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  console.log('New client.');
});

app.post('/login', (req, res) => {
    console.log('Login post request');
});

app.listen(process.env.PORT || 8080);
