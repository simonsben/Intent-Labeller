import { post } from 'axios';

const token_name = 'auth_token'

const sign_up = (user_type, signup_error) => {
    const payload = { user_type };

    return post('/signup', payload)
        .then(response => {
            const { auth_token } = response.data;
            localStorage.setItem(token_name, auth_token);
        })
        .catch(() => signup_error())
}

// Check if user is authenticated
const is_authenticated = (remote_callback) => {
    const auth_token = localStorage.getItem(token_name);

    // If no token is present, not authenticated.
    if (! auth_token)
        return false;
    
    // If token is present, check if it is legal
    post('/login', { auth_token })
        .then(() => remote_callback(true))
        .catch(e => remote_callback(false));

    // Tell app there is a token and its being checked.
    return true;
}

export {
    is_authenticated,
    sign_up,
    token_name
};
