const { Database } = require('sqlite3').verbose();
const { queries } = require('./queries');
const { error_thrower } = require('./utilities');
const { generate_token } = require('./authentication');

const label_map = {
    true: 'POSITIVE',
    false: 'NEGATIVE'
};

// Define Database handler
let database_handler = {
    db: null,
    init: () => {
        this.db = new Database('./labelling_database.sdb')
    },

    // Add new user to database
    new_user: (request, response) => {
        const { user_type } = request.body;

        // Insert new user
        this.db.run(queries.insert_user, user_type, e => {
            error_thrower(e);

            // Get user
            this.db.get(queries.get_last_user, (e, new_user) => {
                console.log('New user', new_user);

                // Generate auth token for user and return it
                generate_token(new_user)
                    .then(auth_token => {
                        response.send({ auth_token });
                    })
            })
        });
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
