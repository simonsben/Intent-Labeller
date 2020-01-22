// import {get} from 'axios';

const temp_contexts = [
    'this is context number 231',
    'this is context number 232',
    'this is context number 233',
    'this is context number 234',
    'this is context number 235',
    'this is context number 236',
    'this is context number 237',
    'this is context number 238',
    'this is context number 239',
    'this is context number 2310'
];

let base_index = temp_contexts.length;
const num_elements = 5;

const request_text = (auth_token, user_id, previous, update_callback) => {
    // const requested_text = get('/request_text', {user_id, auth_token, previous})
    //     .then(res => console.log(request_text))
    //     .catch(e => console.log(e));

    console.log('requesting new contexts.');

    base_index += num_elements;
    if (base_index >= temp_contexts.length)
        base_index = 0;

    update_callback(temp_contexts.slice(base_index, base_index + num_elements));
};

export {
    request_text
};
