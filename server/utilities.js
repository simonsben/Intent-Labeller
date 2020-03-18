const { readFile } = require('fs');
const { parse } = require('papaparse');

const parse_config = {
    skipEmptyLines: true,
    dynamicTyping: true
};

// Read file as promise
const read_file = (filename, parse_data=true, encoding='utf8') => {
    let file_reading = new Promise((resolve, reject) => {
        readFile(filename, encoding, (e, data) => {
            if (e)
                reject(e);
            
            if (parse_data)
                resolve(
                    parse(data, parse_config).data
                );
            resolve(data);
        });
    });

    return file_reading;
};

// Basic error handler
const error_thrower = e => {
    if (e)
        console.log(e);
};

// Returns a successful promise - utility
const empty_promise = (payload=null) => (
    new Promise((resolve, reject) => resolve(payload))
);

// Converts a parsed csv to an array of objects with keys from header
const convert_to_object = (data) => {
    const header = data[0];
    data = data.slice(1);

    return data.map(data_list => {
        let data_object = {};
        header.forEach((key, index) => data_object[key] = data_list[index]);

        return data_object;
    })
};

// Shuffles the contents of an array
const shuffle = values => {
    for(let i=(values.length-1); i>0; i--) {
        const j = Math.floor(Math.random() * i);
        const tmp = values[i];

        values[i] = values[j];
        values[j] = tmp;
    }
    
    return values;
};

module.exports = {
    read_file,
    error_thrower,
    empty_promise,
    convert_to_object,
    shuffle
};
