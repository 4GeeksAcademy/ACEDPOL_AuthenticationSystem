// Define action types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

// Define action creators
export const registerUser = (user) => ({
    type: REGISTER_USER,
    payload: user,
});

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});