import { post } from '$lib/api';
import { respond } from './_respond';

export const login = async (username, password) => {
    const response = await post('/user/login', { username, password })
        .then((result) => {
            return result
        })
        .catch((err) => { throw err })
    if (!response.success) {
        error = (await response.json()).message;
        return
    }

    window.location = '/';

    return respond(response);



};