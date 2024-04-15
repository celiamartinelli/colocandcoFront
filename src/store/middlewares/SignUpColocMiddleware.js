// CREATE GROUPE COLOCATION PAGE SIGNUPCOLOC

import {
  handleSuccessfullSignUpColoc,
  updateCreateGroupColocError,
} from '../userSlice';

const SignUpColocMiddleware = (store) => (next) => (action) => {
  if (action.type === 'CREATE_GROUP') {
    // console.log('Middleware de Création de Groupe de Colocation');

    fetch('http://localhost:3000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        groupName: store.getState().user.group_name,
        email: store.getState().user.email,
        password: store.getState().user.password,
        confirmPassword: store.getState().user.confirm_password,
      }),
    })
      // receive the response(data) in json format
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        // console.log('Server response:', data);

        // Dispatch the action to update the store (userSlice)
        const signUpColocAction = handleSuccessfullSignUpColoc(data);
        // console.log('createGroupAction:', signUpColocAction);
        // envoyer le user_id
        store.dispatch(signUpColocAction);
      })

      .catch((error) => {
        // Dispatch the action to update the store with login error message
        store.dispatch(updateCreateGroupColocError(error.message));
      });
  }

  return next(action);
};
export default SignUpColocMiddleware;
