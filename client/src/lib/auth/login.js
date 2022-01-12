import { post } from '$lib/api';
import { direct } from '$lib/utils';

export const login = async (username, password, token = '') => {
    await post('/user/login', { username, password }, token)
        .then((result) => {
            const auth = result.success
            if (auth) {
                if (token == '') {
                    login(username, password, result.token);
                } else {
                    direct('/');
                }
            } else {
                return result;
            }
        })


};