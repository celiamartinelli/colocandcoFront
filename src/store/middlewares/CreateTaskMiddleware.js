// Task
import { createTask } from '../featureSlice';

const CreateTaskMiddleware = (store) => (next) => (action) => {
  if (action.type === 'CREATE_TASK') {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('userId mw', user.colocId);
    // console.log(token);
    // console.log('action : POST TASK LIST', action);
    // console.log('Contenu de action.payload avant la requête :', action.payload);
    fetch(`http://localhost:3000/task/${user.colocId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        done: store.getState().feature.done,
        description: store.getState().feature.newTaskDescription,
        user_id: user.userId,
        colocation_id: user.colocId,
      }),
    })
      .then((res) => {
        // console.log('réponse TaskmiddlewareUpdate:', res);
        if (!res.ok) {
          throw new Error("les infos task n'ont pas été récupéréés");
        }
        return res.json();
      })
      .then((data) => {
        // console.log('data create task', data);
        store.dispatch(createTask(data));
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

export default CreateTaskMiddleware;
