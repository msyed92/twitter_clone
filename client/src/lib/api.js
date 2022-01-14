const base = 'http://localhost:5000/api';

async function send({ method, path, data, token }) {
    const noBodyData = method === 'GET' || method === 'DELETE'
    const opts = {
        method: `${method}`,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token ? { Cookie: `${token}` } : {})
        },
        ...(!noBodyData ? { body: JSON.stringify(data) } : null)
    }
    return fetch(`${base}${path}`, opts)
        .then(async (r) => {
            return await r.json()
        })
        .then((json) => {
            return json
            // try {
            //     return JSON.parse(json);
            // } catch (err) {
            //     return json;
            // }
        })//.catch((err) => { throw err })
}

export function get(path, token) {
    return send({ method: 'GET', path, token });
}

export function del(path, token) {
    return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
    return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
    return send({ method: 'PUT', path, data, token });
}