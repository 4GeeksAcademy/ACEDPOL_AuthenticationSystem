import { REGISTER_USER, LOGIN_USER, CLEAR_MESSAGE, LOGOUT_USER } from './actions/userActions';

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
    token: localStorage.getItem('token') || null,
  };
};

export default function storeReducer(store, action = {}) {
  // Update the store based on the action type
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo)),
      };
    case REGISTER_USER:
    case LOGIN_USER:
    case LOGOUT_USER:
      // Iniciar un temporizador de 3 segundos para limpiar el mensaje
      setTimeout(() => {
        action.dispatch({ type: CLEAR_MESSAGE });
      }, 3000);
      return {
        ...store,
        ...action.payload,
        message: action.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...store,
        message: null,
      };
    default:
      return store;
  }
}
