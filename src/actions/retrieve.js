import {get} from 'axios';
import { token_name } from './authentication';

let request_in_progress = false;

// TODO think about whether node being single threaded makes this atomic
const request_text = (update_callback, labels=null) => {
    // Add some ?totally incorrect? atomicity to the function
    if (request_in_progress)
        return;
    request_in_progress = true;

    const auth_token = localStorage.getItem(token_name);
    if (!auth_token)
        return;

    const payload = { auth_token, labels };

    get('/get_content', { params: payload })
        .then(response => {
            const { contexts } = response.data;
            console.log('content response', contexts);

            update_callback(contexts);
            request_in_progress = false;
        })
        .catch(e => {
            console.error(e);
            request_in_progress = false;
        });
};

export {
    request_text
};
