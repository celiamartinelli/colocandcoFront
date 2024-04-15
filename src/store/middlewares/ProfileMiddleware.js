// Profile
import { handleSuccessfullProfile } from '../userSlice';

const profileMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');

  // console.log(token);

  if (action.type === 'GET_USER_INFORMATIONS') {
    // console.log('data user profile', action.payload);
    fetch(`http://localhost:3000/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log('Profile middleware - Server Response:', res);
        if (!res.ok) {
          throw new Error("les infos user n'ont pas été récupérer");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        // const { result } = data;
        const profileAction = handleSuccessfullProfile(data);
        // console.log('profileAction:', profileAction);
        store.dispatch(profileAction);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur",
          error
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default profileMiddleware;
