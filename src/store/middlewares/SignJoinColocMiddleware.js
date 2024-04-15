// CREATE A USER BY JOINING A COLOCATION
import {
  handleSuccessfullSignJoinColoc,
  updateJoinColocError,
} from '../userSlice';

const SignJoinColocMiddleware = (store) => (next) => (action) => {
  if (action.type === 'JOIN_GROUP_AND_CREATE_USER') {
    // console.log('Middleware de Création de User en rejoignant une Colocation');
    fetch('http://localhost:3000/user/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        codeColoc: store.getState().user.code_coloc,
        email: store.getState().user.email,
        password: store.getState().user.password,
        confirmPassword: store.getState().user.confirm_password,
      }),
    })
      // receive the response(data) in json format
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error('le code coloc ne correspond pas');
        }
        return res.json();
      })
      .then((data) => {
        // console.log('Server response:', data);
        // Dispatch the action to update the store (userSlice)
        const signJoinColocAction = handleSuccessfullSignJoinColoc(data);
        // console.log('createUserAction:', signJoinColocAction);

        store.dispatch(signJoinColocAction);
      })

      .catch((error) => {
        // Dispatch the action to update the store with login error message
        store.dispatch(updateJoinColocError(error.message));
      });
  }
  return next(action);
};
export default SignJoinColocMiddleware;
