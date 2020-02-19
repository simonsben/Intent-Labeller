import { post } from 'axios';
import { SHA3 } from 'sha3';

const hasher = new SHA3(512);

const authenticate = (user_id, password) => {
    const payload = { user_id, password: hasher.digest(password) };
    console.log('Authentication payload', payload);

    post('/login', payload)
        .then(res => console.log('Good login.'))
        .catch(e => console.log('Bad login request', e));

    // TODO change to res.auth_token
    return 'auth_token';
};

export {
    authenticate
};
