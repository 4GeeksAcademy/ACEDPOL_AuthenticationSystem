// Define action types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const FETCH_HELLO_MESSAGE = 'FETCH_HELLO_MESSAGE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUser = async (user, dispatch) => {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users', {
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
            payload: data,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        // Manejar el error según sea necesario
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
            payload: data,
            user: email,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        // Manejar el error según sea necesario
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
        // Manejar el error según sea necesario
    }
};

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});