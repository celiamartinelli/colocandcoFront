// Update Task
import { updateTask } from '../featureSlice';

const UpdateTaskMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'UPDATE_TASK') {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // Iterate over each task in doneTasks
    const { doneTasks } = store.getState().feature;
    const taskIds = Object.keys(doneTasks);

    // Iterate over each task ID in the array of task IDs.
    taskIds.map(async (taskId) => {
      // For each task ID, retrieve the corresponding task from the doneTasks object.
      const task = doneTasks[taskId];

      try {
        const res = await fetch(
          `http://localhost:3000/task/${user.colocId}/${taskId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              done: task.done,
              taskId: task.taskId,
            }),
          }
        );

        // console.log('réponse TaskmiddlewareUpdate:', res);

        if (!res.ok) {
          throw new Error("les infos task n'ont pas été récupérées");
        }

        const data = await res.json();
        // console.log('data update task', data);

        store.dispatch(updateTask(data));
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des informations task/household_task',
          error
        );
        throw error;
      }
    });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default UpdateTaskMiddleware;
