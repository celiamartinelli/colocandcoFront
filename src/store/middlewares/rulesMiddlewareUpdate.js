import { handleSuccessfullrule } from '../featureSlice';

const rulesMiddlewareUpdate = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'PATCH_RULES') {
    // console.log('action in middleware', action);
    fetch('http://localhost:3000/rule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: action.payload,
      }),
    })
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error("le Réglement intérieur n'as pas été récupérer");
        }
        return res.json();
      })

      .then((data) => {
        // console.log('EEEEEEEE', data);
        store.dispatch(handleSuccessfullrule(data));
        // const rulesUpdatedAction = updateRulesContent(data);
        // console.log('Data dans le middleware after UPDATE RULE----> : ', data);
        // store.dispatch(rulesUpdatedAction);
        // console.log('Modification Rules');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du règlement', error);
        throw error;
      });
  }
  return next(action);
};

export default rulesMiddlewareUpdate;
