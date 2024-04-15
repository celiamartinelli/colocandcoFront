import { logoutAfterDelete } from '../userSlice';

const DeleteParamMiddleware = (store) => (next) => async (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'DELETE_USER') {
    const userId = action.payload;
    // console.log('action.payload', userId);
    try {
      const res = await fetch(`http://localhost:3000/user/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('réponse DELETE USER:', res);

      if (!res.ok) {
        throw new Error("Le user n'as pas été supprimé");
      } else {
        // localStorage.removeItem('token');
        store.dispatch(logoutAfterDelete());
        // Suppression réussie, déclencher l'action de redirection vers la page de connexion
      }
    } catch (error) {
      console.error("Error lors de la suppression d'un utilisateur", error);
      throw error;
    }
  }
  return next(action);
};

export default DeleteParamMiddleware;
