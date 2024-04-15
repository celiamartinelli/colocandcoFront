import './ShoppingPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { changeNewArticleValue } from '../../../store/featureSlice';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function ShoppingPage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.feature.articles);
  //  const [newTask, setNewTask] = useState('');
  const newArticleName = useSelector((state) => state.feature.newArticleName);
  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });

  useEffect(() => {
    // Discover tasks list
    dispatch({ type: 'GET_ARTICLES_LIST' });
  }, [dispatch]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   /*   // Dispatch de l'action pour créer un article
  //   dispatch({
  //     type: 'CREATE_ARTICLE',
  //     payload: {
  //       name: newTask,
  //     },
  //   }); */

  //   // Réinitialiser le champ de saisie après la création
  //   setNewTask('');
  // };

  // const handleDelete = (taskId) => {
  //   // Ajoutez le code pour gérer la suppression d'une tâche
  //   // dispatch({
  //   //   type: 'DELETE_TASK',
  //   //   payload: {
  //   //     taskId,
  //   //   },
  //   // });
  // };

  return (
    <div className="container">
      {isMobile ? (
        <div className="container__nav">
          <FeatureMenu />
        </div>
      ) : (
        <div className="container__nav__phone">
          <FeatureMenuPhone />
        </div>
      )}
      <div className="container__F">
        {isMobile ? (
          <div className="container__F__header">
            <Header />
          </div>
        ) : (
          <div className="container__F__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}

        <div className="container__F__title">
          <h2 className="container__F__title__page">
            Liste des Courses Commune
          </h2>
          <h3 className="container__F__title__h3">
            C'est l'heure d'ouvrir le portefeuille
          </h3>
        </div>
        <div className="app">
          {/* Form for creating a new article */}
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Creating a new TASK:', newArticleName);
              dispatch({
                type: 'CREATE_ARTICLE',
              });
              dispatch({ type: 'GET_ARTICLES_LIST' });
              dispatch(
                changeNewArticleValue({ input: 'newArticleName', value: '' })
              );
            }}
          >
            <input
              type="text"
              value={newArticleName}
              name="newArticleName"
              className="form-item"
              placeholder="Ajouter une nouvelle tâche"
              onChange={(e) => {
                // dispatch the action to update the newArticle value in the store
                const action = changeNewArticleValue({
                  input: 'newArticleName',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
            <button type="submit">Ajouter</button>
          </form>
          {/* List of articles */}
          <div className="list">
            <ul className="list">
              {articles.map((article) => (
                <li key={article.id}>
                  <div className="task-container">
                    <label
                      htmlFor={article.id}
                      className={`list-item ${
                        article.done ? 'list-item--done' : ''
                      }`}
                    >
                      {/* Modify the following line to display the correct content */}
                      <span>{article.name}</span>
                    </label>
                    <div className="delete-button-container">
                      {/* Modify the following line to handle delete action */}
                      <button
                        aria-label="delete article button"
                        type="button"
                        className="delete-button"
                        // onClick={() => handleDelete(article.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => {
                            // Wait for the task removal to complete before requesting the updated task list
                            dispatch({
                              type: 'DELETE_ARTICLE',
                              payload: { articleId: article.id },
                            });
                            // After the article is deleted, request the updated list of tasks
                            dispatch({ type: 'GET_ARTICLES_LIST' });
                          }}
                          className="delete-button__icone"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
