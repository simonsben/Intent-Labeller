const { queries } = require('./queries');
const { parse } = require('papaparse');
const { Database } = require('sqlite3').verbose();
const { read_file, error_thrower } = require('./utilities');

const max_size = 3000;
const data_file = 'subset'

// Open database
const db = new Database('./labelling_database.sdb');

let context_mapping = read_file('../data/' + data_file + '_map.csv');
let contexts = read_file('../data/' + data_file + 's.csv');

// Wait for both files to open
Promise.all([context_mapping, contexts])
    .then(([mappings, contexts]) => {
        contexts = contexts.slice(1);   // Remove file header

        // Initialize index variables
        let mapping_index = 0;
        let context_index = 0;

        // Prepare query
        let query = db.prepare(queries.insert_context);

        // For each context
        contexts.forEach((context, index) => {
            context = context[1].slice(0, max_size);        // Limit maximum size

            // Increment mapping index to current source document
            while(index > mappings[mapping_index][2]) {
                mapping_index++;
                context_index = 0;
            }

            // Package data
            const document_id = mappings[mapping_index][0];
            const package = [index, document_id, context_index, context];

            // Insert data
            query.run(package, error_thrower);
            context_index++;
        });
        // Ensure execution and close database
        query.finalize();        
        db.close();
    })
    .catch(error_thrower);
