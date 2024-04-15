import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: [],
  tasks: [],
  articles: [],
  newTaskDescription: '',
  doneTasks: {},
  taskIdToDelete: '',
  newArticleName: '',
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    //  Reducer for handling rules input value changes
    changeRulesInputValue: (state, action) => {
      // console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling task input value changes
    changeNewTaskValue: (state, action) => {
      // console.log('console.log action changeNewTask  featureSlice', action);
      return {
        ...state,
        [action.payload.input]: action.payload.value,
      };
    },
    // Reducer for handling article input value changes
    changeNewArticleValue: (state, action) => {
      // console.log('console.log action changeNewArticle  featureSlice', action);
      return {
        ...state,
        [action.payload.input]: action.payload.value,
      };
    },

    // Reducer for handling done task input value change by task
    toggleDoneState: (state, action) => {
      const { taskId } = action.payload;
      // creation doneTask objet if doesn't exist
      if (!state.doneTasks[taskId]) {
        state.doneTasks[taskId] = {};
      }
      // toggle state value of taskId and  done
      state.doneTasks[taskId].done = !state.doneTasks[taskId].done;
      state.doneTasks[taskId].taskId = taskId;
    },

    deleteTask: (state, action) => {
      // console.log('action feature delete', action);
      return {
        ...state,
        taskIdToDelete: action.payload.taskId,
      };
    },

    handleSuccessfullrule: (state, action) => {
      // console.log('dfejfjeifjiejfijeijf', action.payload);
      return {
        ...state,
        content: [{ content: action.payload }],
      };
    },
    // reducer of Fetching tasks
    handleSuccessfullTask: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    },

    // reducer of Fetching articles
    handleSuccessfullArticle: (state, action) => {
      return {
        ...state,
        articles: action.payload,
      };
    },

    // reducer creation  tasks
    createTask: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },

    // reducer creation  tasks
    createArticle: (state, action) => {
      return {
        ...state,
        articles: [...state.articles, action.payload],
      };
    },
    // reducer creation  tasks
    updateTask: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },

    // Update Rules
    updateRulesContent: (state, action) => {
      // console.log('payload dans le reducer : ', action.payload);
      return {
        ...state,
        content: [...state.content[0], ...action.payload],
      };
    },
  },
});

export default featureSlice.reducer;

export const {
  changeRulesInputValue,
  updateRulesContent,
  handleSuccessfullrule,
  handleSuccessfullTask,
  createTask,
  changeNewTaskValue,
  updateTask,
  toggleDoneState,
  deleteTask,
  handleSuccessfullArticle,
  createArticle,
  changeNewArticleValue,
} = featureSlice.actions;
