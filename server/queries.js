// TODO move datetime to client

const queries = {
    'insert_context': 'INSERT INTO context VALUES(?, ?, ?, ?);',
    'insert_user': 'INSERT INTO user VALUES(NULL, ?);',
    'get_last_user': 'SELECT * FROM user ORDER BY user_id DESC LIMIT 1;',
    'add_label': 'INSERT INTO context VALUES(NULL, ?, ?, ?, datetime("now"), ?, ?);',
    'get_last_label': 'SELECT * FROM label WHERE user_id=? ORDER BY label_id DESC LIMIT 1;',
    'get_contexts': 'SELECT * FROM context WHERE context_id > ? ORDER BY context_id LIMIT 5;'
};


module.exports = {
    queries
};
