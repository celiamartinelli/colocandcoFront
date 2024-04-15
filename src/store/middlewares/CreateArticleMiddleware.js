// Task
import { createArticle } from '../featureSlice';

const CreateArticleMiddleware = (store) => (next) => (action) => {
  if (action.type === 'CREATE_ARTICLE') {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('userId mw', user.colocId);
    // console.log(token);
    // console.log('action : POST ARTICLE LIST', action);
    // console.log('Contenu de action.payload avant la requête :', action.payload);
    fetch(`http://localhost:3000/article/${user.colocId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name: store.getState().feature.newArticleName,
        expense_id: store.getState().feature.expense_id,
        buyed: store.getState().feature.buyed,
        user_id: user.userId,
        colocation_id: user.colocId,
      }),
    })
      .then((res) => {
        // console.log('réponse ArticlemiddlewareUpdate:', res);
        if (!res.ok) {
          throw new Error("les infos article n'ont pas été récupéréés");
        }
        return res.json();
      })
      .then((data) => {
        // console.log('data create article', data);
        store.dispatch(createArticle(data));
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des information taskhousehold_task'
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default CreateArticleMiddleware;
