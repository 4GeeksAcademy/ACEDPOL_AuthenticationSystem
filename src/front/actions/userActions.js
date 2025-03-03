// Define action types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUser = async (user, dispatch, navigate) => {
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
        // Dispatch the action to update the state
        dispatch({
            type: REGISTER_USER,
            message: 'User registered successfully',
            payload: {},
            dispatch,
        });
        // Redirect the user to the login page
        setTimeout(() => {
            navigate('/login'); 
        }, 1500);
    } catch (error) {
        console.error('Error creating user:', error);
        // Dispatch the action to update the state
        dispatch({
            type: REGISTER_USER,
            message: 'Cannot register user, user may already exist',
            payload: {},
            dispatch,
        });
    }
};

export const loginUser = async (email, password, dispatch, navigate) => {
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
        // Dispatch the action to update the state
        dispatch({
            type: LOGIN_USER,
            payload: { token: data.access_token, user: email },
            message: 'User logged in successfully',
            dispatch,
        });
        // Redirect the user to the private page
        setTimeout(() => {
            navigate('/private'); 
        }, 1500);
    } catch (error) {
        console.error('Error fetching user:', error);
        // Dispatch the action to update the state
        dispatch({
            type: LOGIN_USER,
            message: 'Cannot log in successfully, user may not exist',
            payload: {},
            dispatch,
        });
    }
};

export const logoutUser = async (dispatch, navigate) => {
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
        // Dispatch the action to update the state
        dispatch({
            type: LOGOUT_USER,
            message: 'User logged out successfully',
            payload: { user: null, token: null },
            dispatch,
        });
        // Redirect the user to the login page
        setTimeout(() => {
            navigate('/login'); 
        }, 1500);
    } catch (error) {
        console.error('Error logging out:', error);
        // Dispatch the action to update the state
        dispatch({
            type: LOGOUT_USER,
            message: 'Cannot log out user, something went wrong',
            payload: {},
            dispatch,
        });
    }
};

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});