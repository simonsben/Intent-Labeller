import { post } from 'axios';
import { SHA3 } from 'sha3';

const token_name = 'auth_token'

const signup = (user_type) => {
    const payload = { user_type };

    return post('/signup', payload)
        .then(response => {
            const { auth_token } = response.data;
            localStorage.setItem(token_name, auth_token);

            console.log('Good authentication, token:', auth_token);
        })
        .catch(e => console.error('Bad signup.'))
}

const is_authenticated = () => {
    return !! localStorage.getItem(token_name);
}

const authenticate = () => {
    // const user_type = localStorage.getItem(token_name);

    return null;
};

export {
    is_authenticated,
    authenticate,
    signup
};
