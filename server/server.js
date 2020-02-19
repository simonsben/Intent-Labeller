const express = require('express');
const { database_handler } = require('./database_functions');
const { check_auth } = require('./authentication');
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

// Handle logins/authentication checks
app.post('/login', check_auth, (request, response) => {
    response.sendStatus(200);   // OK status
});

app.get('/get_content', check_auth, database_handler.get_contexts);


// Listener
app.listen(process.env.PORT || 8080);
