// src/routes/api/_db.js
import { v4 as uuidv4 } from 'uuid';

let sessions = [];

export const createSession = (email) => {
    const session = {
        id: uuidv4(),
        email,
    };
    sessions.push(session);
    return Promise.resolve(session);
};

export const getSession = (id) => {
    const session = sessions.find((session) => session.id === id);
    if (!session) return Promise.resolve(null);
    return Promise.resolve(session);
};

export const removeSession = (id) => {
    const session = sessions.find((session) => session.id === id);
    if (!session) return Promise.reject(new Error('Session not found'));
    sessions = sessions.filter((session) => session.id !== id);
    return Promise.resolve(session);
};