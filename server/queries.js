const queries = {
    'insert_context': 'INSERT INTO context VALUES(?, ?, ?, ?);',
    'insert_user': 'INSERT INTO user VALUES(NULL, ?);',
    'get_last_user': 'SELECT * FROM user ORDER BY user_id DESC LIMIT 1'
};


module.exports = {
    queries
};
