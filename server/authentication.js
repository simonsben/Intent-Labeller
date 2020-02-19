const { sign, verify } = require('jsonwebtoken');
const { existsSync } = require('fs');
const { read_file, error_thrower } = require('./utilities');

const paths = {
    public: 'auth/public.key',
    private: 'auth/private.key'
};

let private_key = null;

const load_keys = async () => {
    // Check if already loaded
    if (!!private_key)
        return;
    
    // Check if file exists
    if (!existsSync(paths.private))
        console.error('Private key does not exist, generate it.');

    // Load key
    try {
        const data = await read_file(paths.private, false);
        private_key = data;
    } catch (e) {
        return error_thrower(e);
    }
};

const generate_token = user => {
    return load_keys()
        .then(() => sign(user, private_key))
        .catch(error_thrower);
};

// const verify_middleware = (request, response, next) => {

// }

module.exports = {
    generate_token
};
