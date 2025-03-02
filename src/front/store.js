import { REGISTER_USER, LOGIN_USER, CLEAR_MESSAGE, FETCH_HELLO_MESSAGE } from './actions/userActions';

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
    user: null,
    helloMessage: null, // Añadir el estado del mensaje de hello
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
        user: action.payload,
        message: 'User registered successfully',
      };
    case LOGIN_USER:
      return {
        ...store,
        user: action.payload,
        message: 'User logged in successfully',
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
