// CREATE A USER BY JOINING A COLOCATION
import { createUser, updateJoinColocError } from './userSlice';

const SignJoinColocMiddleware = (store) => (next) => (action) => {
  if (action.type === 'JOIN_GROUP_AND_CREATE_USER') {
    console.log('Middleware de Création de User en rejoignant une Colocation');
    fetch('http://localhost:3000/???', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        codecoloc: store.getState().user.codecoloc,
        email: store.getState().user.email,
        password: store.getState().user.password,
        confirmpassword: store.getState().user.confirmpassword,
      }),
    })
      // receive the response(data) in json format
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        // Dispatch the action to update the store (userSlice)
        const createUserAction = createUser(data);
        console.log('createUserAction:', createUserAction);

        store.dispatch(createUserAction);
      })

      .catch((error) => {
        // Dispatch the action to update the store with login error message
        store.dispatch(updateJoinColocError(error.message));
      });
  }
  return next(action);
};
export default SignJoinColocMiddleware;
