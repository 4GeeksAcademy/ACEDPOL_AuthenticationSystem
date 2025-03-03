import { REGISTER_USER, LOGIN_USER, CLEAR_MESSAGE, FETCH_HELLO_MESSAGE, LOGOUT_USER } from './actions/userActions';

export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    user: localStorage.getItem('user') || null,
    helloMessage: null, // Añadir el estado del mensaje de hello
    token: localStorage.getItem('token') || null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo)),
      };
    case REGISTER_USER:
      return {
        ...store,
        message: 'User registered successfully',
      };
    case LOGIN_USER:
      return {
        ...store,
        user: action.user,
        token: action.payload.access_token,
        message: 'User logged in successfully',
      };
    case LOGOUT_USER:
      return {
        ...store,
        user: null,
        token: null,
        message: 'User logged out successfully',
      };
    case FETCH_HELLO_MESSAGE:
      return {
        ...store,
        helloMessage: action.payload,
        message: 'Hello message fetched successfully',
      };
    case CLEAR_MESSAGE:
      return {
        ...store,
        message: null,
        helloMessage: null,
      };
    default:
      // throw new Error('Unknown action.');
  }
}
