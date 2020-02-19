const express = require('express');
const { database_handler } = require('./database_functions');
const path = require('path');
const body_parser = require('body-parser')

const app = express();
database_handler.init();

app.use(express.static(path.join(__dirname, 'build')));
app.use( body_parser.json() );

// Page requests
app.get('/', (request, response) => {
    response.sendFile(
        path.join(__dirname, '../public', 'index.html')
    );
});

// Handle new users
app.post('/signup', database_handler.new_user);

// Handle logins
app.post('/login', (req, res) => {
    res.send({is_good: true});
});


// Listener
app.listen(process.env.PORT || 8080);
