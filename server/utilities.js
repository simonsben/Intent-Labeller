const { readFile } = require('fs');
const { parse } = require('papaparse');

const parse_config = {
    skipEmptyLines: true,
    dynamicTyping: true
};

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

const error_thrower = e => {
    if (e)
        console.error(e);
};

module.exports = {
    read_file,
    error_thrower
};
