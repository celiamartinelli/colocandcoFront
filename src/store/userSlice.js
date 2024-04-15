import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
  rememberMe: false,
  email: 'Cesaire44@gmail.com',
  password: 'QP7cknR83Wwy6B2',
  confirmpassword: 'QP7cknR83Wwy6B2',
  groupname: 'groupe1',
  firstName: '',
  lastName: '',
  phonenumber: '0600000000',
  birthDate: '01/01/2001',
  codecoloc: 'XYZ34E21',
  avatarFile: {
    name: '',
    type: '',
    size: 0,
  },
  profession: 'Développeur web',
  workTimetable: '9h-17h',
  emergency_name: '',
  emergency_link: '',
  emergency_number: '',
  // Use the same properties pseudo and token from API
  // These values will be updated by the API
  pseudo: '',
  error: ' ',
  // joinedColocation in SignJoinColocPage when the user submit
  joinedColocation: false,
  createdColocation: '',
  token: '',
};

// Create a Redux slice named 'userSlice' with initial state and reducers
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState,
  reducers: {
    // Reducer for handling login input value changes
    changeLoginInputValue: (state, action) => {
      console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling signup input value changes
    changeSignupInputValue: (state, action) => {
      console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling signup input value changes
    changeProfileInputValue: (state, action) => {
      console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling sign up Join Coloc input value changes
    changeSignJoinColocInputValue: (state, action) => {
      console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling successful login
    handleSuccessfullLogin: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    handleSuccessfullSignUpColoc: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // reducer  dispatch the action when the user has joined  a colocation with success
    joinColocationSuccess: (state) => {
      return {
        ...state,
        joinedColocation: true,
      };
    },

    // Reducer for toggling remerberMe
    toggleRememberMe: (state) => {
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };
    },

    // Reducer for toggling user logout
    toggleLogout: (state) => {
      console.log('toggleLogout action');
      if (state.logged) {
        // Vider le token du stockage local
        localStorage.removeItem('token');
      }
      return {
        ...state,
        logged: !state.logged,
      };
    },

    // Reducer for updating login errors
    updateLoginError: (state, action) => {
      console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    updateCreateGroupColocError: (state, action) => {
      console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    updateJoinColocError: (state, action) => {
      console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    // Possible to reuse to update the profile page
    createUserProfile: (state, action) => {
      console.log('createGroup action');
      const { firstName, lastName, phoneNumber, birthDate, avatarFile } =
        action.payload;
      return {
        ...state,
        firstName,
        lastName,
        phoneNumber,
        birthDate,
        avatarFile,
      };
    },

    // Possible to reuse to update the profile page
    updateProfileError: (state, action) => {
      console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },



    updateEditedProfileData: (state, action) => {
      const { field, value } = action.payload;
      state[`edited${field}`] = value;
    },
  },
});

// Export of reducers of the slice
export default userSlice.reducer;

// Export of action creators of my reducers
export const {
  changeLoginInputValue,
  changeSignupInputValue,
  changeProfileInputValue,
  changeSignJoinColocInputValue,
  toggleLogout,
  handleSuccessfullLogin,
  toggleRememberMe,
  updateLoginError,
  handleSuccessfullSignUpColoc,
  updateCreateGroupColocError,
  createUser,
  updateJoinColocError,
  createUserProfile,
  updateProfileError,
  joinColocationSuccess,
  updateEditedProfileData,
} = userSlice.actions;
