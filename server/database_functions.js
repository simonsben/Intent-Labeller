const { Database } = require('sqlite3').verbose();
const { queries } = require('./queries');
const { error_thrower } = require('./utilities');
const { generate_token } = require('./authentication');

const label_map = {
    true: 'POSITIVE',
    false: 'NEGATIVE'
};

const run_callback = (resolve, reject) => (e) => {
    if (e)
        reject(e);
    resolve();
};

const get_callback = (resolve, reject) => (e, data) => {
    if (e)
        reject(e);
    resolve(data);
};

// Define Database handler
let database_handler = {
    db: null,
    init: () => {
        this.db = new Database('./labelling_database.sdb')
    },

    // Convert generic database actions to promise
    db_action: (action, query, parameters, callback_generator) => (
        new Promise((resolve, reject) => {
            const callback = callback_generator(resolve, reject);

            if (!!parameters)
                this.db[action](query, parameters, callback);
            else
                this.db[action](query, callback);
        })
    ),

    // Promise version of specific actions
    run: (query, parameters=null) => database_handler.db_action('run', query, parameters, run_callback),
    get: (query, parameters=null) => database_handler.db_action('get', query, parameters, get_callback),

    // Add new user to database
    new_user: (request, response) => {
        const { user_type } = request.body;

        // Insert new user
        database_handler.run(queries.insert_user, user_type)
            // Get user profile
            .then(() => database_handler.get(queries.get_last_user))
            
            // Generate user token
            .then(new_user => {
                console.log('New user', new_user);

                // Generate auth token for user and return it
                return generate_token(new_user)
            })

            // Send auth token
            .then(auth_token => response.send({ auth_token }))
            .catch(error_thrower)
    },

    // Add user labels to database
    add_labels: (request, response) => {
    },

    // Get contexts for user
    get_contexts: (request, response) => {
        const { user } = request;

        // this.db.get(queries.get_last_label, (e, last_label) => {

        // })

        console.log('Content request from', user);
    }
};




module.exports = {
    database_handler
};
