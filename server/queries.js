// TODO move datetime to client
const { readFileSync } = require('fs');

const queries = {
    'insert_context': 'INSERT INTO context VALUES(?, ?, ?, ?);',
    'get_contexts': readFileSync('database_utilities/get_contexts.sql', 'utf8'),
    
    'insert_user': 'INSERT INTO user VALUES(NULL, ?);',
    'get_last_user': 'SELECT * FROM user ORDER BY user_id DESC LIMIT 1;',
    
    'insert_label': 'INSERT INTO label VALUES(NULL, ?, ?, ?, datetime("now"), ?, ?);',
    'get_last_label': 'SELECT context_id FROM label WHERE user_id = ? ORDER BY context_id DESC LIMIT 1;',

    'insert_visit': 'INSERT INTO visit VALUES(NULL, ?, ?, datetime("now"));',
    'get_visit': 'SELECT visit_id FROM visit WHERE user_id = ? ORDER BY visit_id DESC LIMIT 1;'
};


module.exports = {
    queries
};
