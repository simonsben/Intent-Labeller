const { readFile } = require('fs');
const { parse } = require('papaparse');

const parse_config = {
    skipEmptyLines: true,
    dynamicTyping: true
};

const read_file = (filename, encoding='utf8', parse_data=true) => {
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



module.exports = {
    read_file
};
