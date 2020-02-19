import {get} from 'axios';
import { token_name } from './authentication';

const request_text = (update_callback, previous=null) => {
    const auth_token = localStorage.getItem(token_name);
    const payload = { auth_token, previous };

    get('/get_content', { params: payload })
        .then(response => {
            console.log('content response', response);
        })
        .catch(e => console.log(e));

    // update_callback(temp_contexts.slice(base_index, base_index + num_elements));
};

export {
    request_text
};
