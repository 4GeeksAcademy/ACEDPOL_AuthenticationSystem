// Define action types
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

// Define action creators
export const registerUser = (user) => async (dispatch) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Error creating user');
        }

        const data = await response.json();
        dispatch({
            type: REGISTER_USER,
            payload: data,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        // Manejar el error según sea necesario
    }
};

export const loginUser = (email) => async (dispatch) => {
    try {
        const response = await fetch(`/api/users/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching user');
        }

        const data = await response.json();
        dispatch({
            type: LOGIN_USER,
            payload: data,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        // Manejar el error según sea necesario
    }
};

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});