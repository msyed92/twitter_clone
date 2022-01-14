import { post, get } from '$lib/api';
import { authenticated } from '../../stores/auth'


export const login = async (username, password) => {
    const response = await post('/user/login', { username, password }).then((r) => { return r }).catch((err) => { throw err })
    if (!response.success) {
        const error = (await response).message;
        return error
    }
    window.location = '/';
    return response

};

export const logout = async () => {
    const response = await post('/user/logout').then((r) => { return r }).catch((err) => { throw err })
    if (!response.success) {
        error = (await response).message;
        return error
    }

    window.location = '/';

    return response

};

export const register = async (username, password, email, phone, firstName, lastName) => {
    const response = await post('/user/register', { username, password, email, phone, firstName, lastName }).then((r) => { return r }).catch((err) => { throw err })
    if (!response.success) {
        const error = (await response).message;
        return error
    }
    window.location = '/';
    return response

};

export const authenticate = async () => {
    try {
        await get('/user/protected')
            .then((res) => {
                if (!res.success) {
                    authenticated.set(false);
                } else {
                    authenticated.set(true);
                }
                return res
            })
            .catch((err) => {
                throw err;
            });
    } catch (e) {
        throw e;
    }
}