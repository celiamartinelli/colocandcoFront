import { handleSuccessfullLogin, updateLoginError } from '../userSlice';

const loginMiddleware = (store) => (next) => (action) => {
  // Check if the action type is 'SUBMIT_LOGIN'
  // console.log('Current logged status before:', store.getState().user.logged);

  const isTokenPresent = () => {
    const token = localStorage.getItem('token');
    /*  const user = localStorage.getItem('user'); */
    return !!token; // renvoie true si le token est présent, sinon false
  };

  if (isTokenPresent()) {
    //  console.log('Le token est présent dans le localStorage.');
  } else {
    //  console.log("Le token n'est pas présent dans le localStorage.");
  }
  if (action.type === 'SUBMIT_LOGIN') {
    console.log('Une action de type submit a été détectée');
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      mode: 'cors',
      body: JSON.stringify({
        email: store.getState().user.email,
        password: store.getState().user.password,
        userId: store.getState().user.userId,
      }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Cet identifiant ou mot de passe est invalide');
        }
        return res.json();
      })
      // a revoir dans la logique
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        const loginAction = handleSuccessfullLogin({
          logged: data.logged,
          token: data.token,
          user: data.user,
        });

        // console.log('data', data.user);
        // console.log('loginAction', loginAction);
        store.dispatch(loginAction);
        // console.log(
        //   'Current logged status after:',
        //   store.getState().user.logged
        // );
      })

      .catch((error) => {
        store.dispatch(updateLoginError(error.message));
      });
  }
  return next(action);
};
export default loginMiddleware;
