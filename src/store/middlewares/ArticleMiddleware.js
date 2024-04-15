// Article ShoppinPAge
import { handleSuccessfullArticle } from '../featureSlice';

const ArticleMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  // console.log(token);

  if (action.type === 'GET_ARTICLES_LIST') {
    console.log('GET_ARTICLES_LIST action detected');
    fetch('http://localhost:3000/article', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log('Article middleware - Server Response:', res);

        if (!res.ok) {
          throw new Error("les infos article n'ont pas été récupéréés");
        }
        return res.json();
      })

      .then((json) => {
        // console.log('Response Body JSON:', json);

        const data = json;
        // console.log('DATA ARTICLEMW', data);

        const articleAction = handleSuccessfullArticle(data);
        // console.log('articleAction:', articleAction);
        store.dispatch(articleAction);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des informations article_shoplist:',
          error
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default ArticleMiddleware;
