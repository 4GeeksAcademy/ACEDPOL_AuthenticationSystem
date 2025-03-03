// Define action types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const FETCH_HELLO_MESSAGE = 'FETCH_HELLO_MESSAGE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUser = async (user, dispatch) => {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Error creating user');
        }

        const data = await response.json();
        console.log('User registered:', data);
        dispatch({
            type: REGISTER_USER,
        });
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const loginUser = async (email, password, dispatch) => {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Error fetching user');
        }

        const data = await response.json();
        console.log('User fetched:', email, data);
        localStorage.setItem('user', email);  // Guardar el usuario en localStorage
        localStorage.setItem('token', data.access_token);  // Guardar el token en localStorage
        dispatch({
            type: LOGIN_USER,
            payload: data.access_token,
            user: email,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const fetchHelloMessage = async (dispatch) => {
    console.log('Fetching hello message...');
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Error fetching hello message');
        }

        const data = await response.json();
        console.log('Hello message fetched:', data);
        dispatch({
            type: FETCH_HELLO_MESSAGE,
            payload: data,
        });
    } catch (error) {
        console.error('Error fetching hello message:', error);
    }
};

export const logoutUser = async (dispatch) => {
    try {
        const email = localStorage.getItem('user');
        console.log('Logging out user:', email);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Error logging out');
        }

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({
            type: LOGOUT_USER,
        });
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});