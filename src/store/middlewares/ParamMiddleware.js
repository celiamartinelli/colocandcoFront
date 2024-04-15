// Profile
import { handleSuccessfullParam } from '../userSlice';

const paramMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');

  if (action.type === 'GET_USER_PARAMETER') {
    fetch(`http://localhost:3000/setting`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("les infos paramètres user n'ont pas été récupérer");
        }
        return res.json();
      })
      .then((data) => {
        const paramAction = handleSuccessfullParam(data);

        store.dispatch(paramAction);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations paramètre sur l'utilisateur",
          error
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default paramMiddleware;
