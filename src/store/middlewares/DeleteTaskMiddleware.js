// Delete task

// import { updateTask } from '../featureSlice';

const DeleteTaskMiddleware = () => (next) => async (action) => {
  if (action.type === 'DELETE_TASK') {
    const token = localStorage.getItem('token');
    // console.log('action delete', action);
    // Retrieve the task ID from the action payload
    const { taskId } = action.payload;
    // Retrieve the task ID from the state
    // const { taskId } = store.getState().feature;
    // console.log('taskid DELET MW', taskId);

    // const taskIdToDelete = action.payload.taskId;

    try {
      const res = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('réponse DeleteTaskmiddleware:', res);

      if (!res.ok) {
        throw new Error("les infos task n'ont pas été récupérées");
      }

      // const data = await res.json();
      /*   console.log('data update task', data);
        
                    store.dispatch(updateTask(data)); */
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des informations task/household_task',
        error
      );
      throw error;
    }
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default DeleteTaskMiddleware;
