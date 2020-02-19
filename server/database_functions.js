const { Database } = require('sqlite3').verbose();
const { queries } = require('./queries');
const { error_thrower } = require('./utilities');
const { generate_token } = require('./authentication');


// Define Database handler
let database_handler = {
    db: null,
    init: () => {
        this.db = new Database('./labelling_database.sdb')
    },
    new_user: (request, response) => {
        const { user_type } = request.body;

        // Insert new user
        this.db.run(queries.insert_user, user_type, e => {
            error_thrower(e);

            // Get user
            this.db.get(queries.get_last_user, (e, new_user) => {
                console.log(new_user);

                // Generate auth token for user and return it
                generate_token(new_user)
                    .then(auth_token => {
                        response.send({ auth_token });
                    })
            })
        });
    }
};




module.exports = {
    database_handler
};
