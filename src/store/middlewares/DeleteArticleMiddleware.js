// Delete article

const DeleteArticleMiddleware = () => (next) => async (action) => {
  if (action.type === 'DELETE_ARTICLE') {
    const token = localStorage.getItem('token');
    // console.log('action delete ARTICLE', action);
    // Retrieve the task ID from the action payload
    const { articleId } = action.payload;
    // Retrieve the task ID from the state
    // const { taskId } = store.getState().feature;
    // console.log('articleid DELET MW', articleId);

    // const taskIdToDelete = action.payload.taskId;

    try {
      const res = await fetch(`http://localhost:3000/article/${articleId}`, {
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

export default DeleteArticleMiddleware;
