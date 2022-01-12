const base = 'http://localhost:5000/api';

async function send({ method, path, data, token }) {
    const noBodyData = method === 'GET' || method === 'DELETE'
    const opts = {
        method: `${method}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        ...(!noBodyData ? { body: JSON.stringify(data) } : null)
    }

    return fetch(`${base}${path}`, opts)
        .then((r) => r.text())
        .then((json) => {
            try {
                return JSON.parse(json);
            } catch (err) {
                return json;
            }
        });
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