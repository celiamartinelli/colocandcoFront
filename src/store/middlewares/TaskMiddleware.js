// Task
import { handleSuccessfullTask } from '../featureSlice';

const TaskMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  // console.log(token);

  if (action.type === 'GET_TASKS_LIST') {
    console.log('GET_TASKS_LIST action detected');
    fetch('http://localhost:3000/task', {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log('Task middleware - Server Response:', res);
        if (!res.ok) {
          throw new Error("les infos task n'ont pas été récupéréés");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        const taskAction = handleSuccessfullTask(data);
        // console.log('taskAction:', taskAction);
        store.dispatch(taskAction);
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

export default TaskMiddleware;
