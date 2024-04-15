import { handleSuccessfullParam } from '../userSlice';

const ParamUpdateMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'PATCH_USER_PARAM') {
    fetch('http://localhost:3000/setting', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(action.payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("les informations user n'ont pas été récupérer");
        }
        return res.json();
      })
      .then((data) => {
        const colocInfo = data.colocInfo.result[0];
        const userInfo = data.userInfo.result[0];
        const aggUserColoc = { settingInfo: { colocInfo, userInfo } };
        store.dispatch(handleSuccessfullParam(aggUserColoc));
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

export default ParamUpdateMiddleware;
