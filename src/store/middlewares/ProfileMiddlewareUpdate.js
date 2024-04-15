import { handleSuccessfullProfile } from '../userSlice';

const profileMiddlewareUpdate = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'PATCH_USER_INFORMATIONS') {
    fetch('http://localhost:3000/user/update_profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...action.payload,
        pet: store.getState().user.userData.pet,
        available: store.getState().user.userData.available,
      }),
    })
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error("les informations user n'ont pas été récupérer");
        }
        return res.json();
      })

      .then((data) => {
        // console.log('Réponse du backend :', data);
        const { result } = data;
        // a ne plus jamais faire mais a garder pour que ça marche
        // pattern adaptater
        const formatedResult = { ...result[0] };
        store.dispatch(handleSuccessfullProfile(formatedResult));
        // console.log('Data dans le middleware after UPDATE USER----> : ', data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des infos utilisateur',
          error
        );
        throw error;
      });
  }
  return next(action);
};

export default profileMiddlewareUpdate;
