const { queries } = require('./queries');
const { parse } = require('papaparse');
const { Database } = require('sqlite3').verbose();
const { read_file, error_thrower, convert_to_object, shuffle } = require('./utilities');

const max_size = 3000;
const data_file = 'labelling_contexts'

// Open database
const db = new Database('./labelling_database.sdb');

let load_contexts = read_file('../data/labelling_contexts.csv');
let load_qualifiers = read_file('../data/qualifying_contexts.csv');

Promise.all([load_contexts, load_qualifiers])
    .then(([raw_contexts, qualifiers]) => {
        raw_contexts = convert_to_object(raw_contexts)
        qualifiers = shuffle(convert_to_object(qualifiers));

        // Prepare query
        let query = db.prepare(queries.insert_context);

        // For each context
        raw_contexts.forEach((context, index) => {
            // Package data
            let { context_id, contexts, document_index, context_index } = context;
            contexts = contexts.slice(0, max_size);        // Limit maximum size
            const package = [ index, document_index, context_index, contexts ];

            // Insert data
            query.run(package, error_thrower);
        });
        console.log('Executed context queries.');

        // For each qualifying context
        qualifiers.forEach((qualifier, index) => {
            const { is_intent, contexts } = qualifier;
            const entry_index = -(index + 1)
            const package = [ entry_index, entry_index, is_intent, contexts ]

            query.run(package, error_thrower);
        });
        console.log('Executed qualifying queries.');

        // Ensure execution and close database
        query.finalize();        
        db.close();
    })
    .catch(error_thrower);
