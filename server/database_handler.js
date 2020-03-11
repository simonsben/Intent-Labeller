const { Database } = require('sqlite3').verbose();
const { queries } = require('./queries');
const { error_thrower, empty_promise } = require('./utilities');
const { generate_token, reviver } = require('./authentication');

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
    all: (query, parameters=null) => database_handler.db_action('all', query, parameters, get_callback),

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
                request.user = new_user;

                // Generate auth token for user and return it
                return generate_token(new_user)
            })

            // Send auth token
            .then(auth_token => {
                response.send({ auth_token });
                database_handler.add_visit(request, response, false);
            })
            .catch(error_thrower);
    },

    add_visit: (request, response, send_response=true) => {
        if (send_response)
            response.sendStatus(200);   // OK status

        const client_ip = request.headers['x-forwarded-for'];
        const { user_id } = request.user;
        const package = [user_id, client_ip];

        database_handler.run(queries.insert_visit, package)
        .catch(error_thrower)
    },

    // Add user labels to database
    add_labels: (labels, user_id) => {
        if (!labels)
            return empty_promise();
                
        // Get visit id
        return database_handler.get(queries.get_visit, [ user_id ])
            // For each label
            .then(({ visit_id }) => (
                Promise.all(
                    // Insert and wait for them all to be inserted
                    labels.map(label => {
                        const { intent, abuse, context_id } = JSON.parse(label, reviver);
                        const package = [
                            context_id,
                            user_id,
                            visit_id,
                            intent,
                            abuse
                        ];
                        console.log('label package', package)
    
                        return database_handler.run(queries.insert_label, package)
                    })
                )
            ))
            .catch(error_thrower)
    },

    // Get contexts for user
    get_contexts: (request, response) => {
        const { user_id } = request.user;
        const { labels } = request.query;

        // Insert labels if possible
        database_handler.add_labels(labels, user_id)
            // Get next set of contexts to label
            .then(() => database_handler.all(queries.get_contexts, [ user_id ]))
            // Send contexts back to client
            .then(contexts => {
                // If no more data, send complete.
                if (contexts.length == 0) {
                    response.send({ complete: true });
                    return;
                }

                response.send({ contexts });
            })
            .catch(error_thrower)
    }
};



module.exports = {
    database_handler
};
