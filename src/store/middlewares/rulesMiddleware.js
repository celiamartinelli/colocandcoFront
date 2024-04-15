import { handleSuccessfullrule } from '../featureSlice';

// rulesMiddleware

const rulesMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  // console.log(token);
  if (action.type === 'GET_RULES_CONTENT') {
    fetch(`http://localhost:3000/rule`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("le Réglement intérieur n'as pas été récupéré");
        }

        return res.json();
      })

      .then((data) => {
        // console.log('DAAAAATA', data);
        // console.log(data[0].content);
        const ruleAction = handleSuccessfullrule(data[0].content);
        // console.log('ruleAction:', ruleAction);
        store.dispatch(ruleAction);
      })

      .catch((error) => {
        console.error('Erreur lors de la récupération du réglement', error);
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default rulesMiddleware;
