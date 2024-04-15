// rulesMiddleware
import { getAllUsers } from '../userSlice';

const colocUsersMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'GET_ALL_USERS') {
    fetch(`http://localhost:3000/user/all`, {
      method: 'GET',
      headers: {
        //  'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log('users middleware', res);
        if (!res.ok) {
          throw new Error("Les infos des colocs n'ont pas été récupéré");
        }

        return res.json();
      })
      .then((data) => {
        // console.log(data);
        const { result } = data;
        const usersActions = getAllUsers(result);
        store.dispatch(usersActions);
        // console.log('Affichage Users', data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des infos sur les colocataire',
          error
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default colocUsersMiddleware;
