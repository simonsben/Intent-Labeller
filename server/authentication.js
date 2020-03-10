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
        .then(() => sign(user, private_key, { expiresIn: '365d' }))
        .catch(error_thrower);
};

const check_auth = async (request, response, next) => {
    await load_keys();
    
    // Check for auth
    const { auth_token } = (request.method === 'POST')? request.body : request.query;
    
    // Check if token was provided in the request
    if (! auth_token) {
        response.sendStatus(403);   // Forbidden response
        return;
    }
    
    // Check if the token can be decrypted
    verify(auth_token, private_key, (e, user) => {
        if (e) {
            response.sendStatus(403);
            return;
        }
        
        request.user = user;
        next();
    });
};

// Expected JSON request keys
const approved_keys = new Set([
    'auth_token',
    'user_type',
    'labels',
    'intent_label',
    'abuse_label'
]);

// Checks for expected keys, otherwise removes value
const reviver = (key, value) => {
    // Key
    if (approved_keys.has(key))
        return value;
    // Final parsed object
    else if ((key === '') && ((typeof value) === 'object'))
        return value;

    console.log('no key', key, 'value', value);
    return null;
};

module.exports = {
    check_auth,
    generate_token,
    reviver
};
