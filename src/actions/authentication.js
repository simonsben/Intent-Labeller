import md5 from 'blueimp-md5';
import {post} from 'axios';

const authenticate = (user_id, password) => {
    const payload = {user_id, password: md5(password)};

    post('/login', payload)
        .then(res => console.log('Good login.'))
        .catch(e => console.log('Bad login request', e));

    // TODO change to res.auth_token
    return 'auth_token';
}

export {
    authenticate
};
