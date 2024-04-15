import { createSlice } from '@reduxjs/toolkit';
// import { format } from 'date-fns';

const initialState = {
  userData: [],
  settingUser: {},
  users: [],
  refresh_avatar: false,

  loading: false,
  error: null,
  logged: false,
  // rememberMe: false,
  email: '',
  password: '',
  confirm_password: '',
  group_name: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  birthdate: '',

  code_coloc: '',
  description: 'Décris toi en quelque mots',
  avatar_file: '',
  profession: '',
  worktime_table: '',
  emergency_name: '',
  emergency_link: '',
  emergency_number: '',
  adress: '',
  // Use the same properties pseudo and token from API
  // These values will be updated by the API
  pseudo: '',
  created: '',
  allergy: ['Gluten, Lactose, Oeufs, Fruits de mer , Arachides'],

  // joinedColocation in SignJoinColocPage when the user submit
  joinedColocation: false,
  // createdColocation in SignUpColocPage when the user submit
  createdColocation: false,
  // createdProfile in CreateProfilePage when the user submit
  createdProfile: false,
  token: '',
  userId: '',
};

// Create a Redux slice named 'userSlice' with initial state and reducers
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState,
  reducers: {
    // Reducer for handling login input value changes
    changeLoginInputValue: (state, action) => {
      // console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling signup input value changes
    changeSignupInputValue: (state, action) => {
      // console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling signup input value changes
    changeProfileInputValue: (state, action) => {
      // console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling sign up Join Coloc input value changes
    changeSignJoinColocInputValue: (state, action) => {
      // console.log(action);
      return { ...state, [action.payload.input]: action.payload.value };
    },

    // Reducer for handling successful login (dispatch on loginMiddleware)
    handleSuccessfullLogin: (state, action) => {
      // console.log('dataUser', action.payload.user);
      return {
        ...state,
        logged: action.payload.logged,
        token: action.payload.token,
        userData: action.payload.user,
      };
    },
    // Reducer for handling successful group creation (dispatch on SignUpColocMiddleware)
    handleSuccessfullSignUpColoc: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // Reducer for handling successful colocation join (dispatch on SignJoinColocMiddleware)
    handleSuccessfullSignJoinColoc: (state, action) => {
      return {
        ...state,
        ...action.payload,
        joinedColocation: true,
      };
    },

    /*
    // Reducer for toggling remerberMe
    toggleRememberMe: (state) => {
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };
    },
    */
    persistValuesState: (state, action) => {
      // console.log('action persistValues', action);
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.user,
        logged: action.payload.logged,
        settingUser: action.payload.settingInfo,
      };
    },

    // Reducer for toggling user logout
    toggleLogout: (state) => {
      // console.log('toggleLogout action');
      if (state.logged) {
        // Vider le token du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // localStorage.removeItem('settingInfo');
      }
      return {
        ...state,
        logged: !state.logged,
        userData: {},
      };
    },

    logoutAfterDelete: (state) => {
      // Supprimer le token et les informations de l'utilisateur du stockage local
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return {
        ...state,
        logged: false,
        userData: {},
      };
    },
    // Reducer for updating login errors
    updateLoginError: (state, action) => {
      // console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    updateCreateGroupColocError: (state, action) => {
      // console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    updateJoinColocError: (state, action) => {
      // console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },

    // Possible to reuse to update the profile page
    createUserProfile: (state, action) => {
      // console.log('createGroup', action);

      return {
        ...state,
        userData: action.payload,
      };
    },
    // Upload avatar
    uploadAvatar: (state, action) => {
      state.loading = true;
      state.error = null;
      state.fileName = action.payload.fileName;
      state.fileSize = action.payload.fileSize;
    },

    uploadAvatarSuccess: (state, action) => {
      return {
        ...state,
        avatar_file: action.payload,
      };
    },

    uploadAvatarFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setCreatedColocation: (state, action) => {
      return {
        ...state,
        createdColocation: action.payload,
      };
    },

    // Possible to reuse to update the profile page
    updateProfileError: (state, action) => {
      // console.log('action :', action);
      return {
        ...state,
        // Update the 'error' property of the state with the login error message
        // from the action payload.(dispatch from the loginMiddleware)
        error: action.payload,
      };
    },
    // user data for the profile page
    handleSuccessfullProfile: (state, action) => {
      // console.log('action PROFILE', action);
      return {
        ...state,
        userData: action.payload,
      };
    },

    updateEditedProfileData: (state, action) => {
      // console.log('payload dans le reducer User : ', action.payload);
      return {
        ...state,
        userData: [...state.userData, ...action.payload],
      };
    },

    handleSuccessfullParam: (state, action) => {
      // Retourne un nouvel état en remplaçant les données actuelles des paramètres par les nouvelles
      return {
        ...state, // effectue une copie de l'état actuel
        settingUser: action.payload, // remplace les données actuelles par les nouvelles
      };
    },

    updateEditedParamData: (state, action) => {
      return {
        ...state,
        settingUser: [...state.settingUser, ...action.payload],
      };
    },

    /* toggleAvailableStatusState: (state, action) => {
    console.log('action AVAILABLE USERSLICE', action);

     const { id } = action.payload;

     // Mise à jour de la propriété 'available' pour l'utilisateur spécifié
     const updatedUsers = state.users.map((user) => {
       if (user.id === id) {
         return {
           ...user,
           available: !user.available, // Inversion de la valeur
         };
       }
       return user;
     });

     return {
       ...state,
       users: updatedUsers,
     };
   },
*/
    toggleAvailableProfile: (state) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          available: !state.userData.available,
        },
      };
    },

    togglePetProfile: (state) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          pet: !state.userData.pet,
        },
      };
    },
    // add action setError
    setError: (state) => {
      delete state.error;
    },

    getAllUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },

    reloadAvatar: (state) => {
      return {
        ...state,
        refresh_avatar: !state.refresh_avatar,
      };
    },
  },
});

// Export of reducers of the slice
export default userSlice.reducer;

// Export of action creators of my reducers
export const {
  setDate,
  changeLoginInputValue,
  changeSignupInputValue,
  changeProfileInputValue,
  changeSignJoinColocInputValue,
  toggleLogout,
  handleSuccessfullLogin,
  toggleRememberMe,
  updateLoginError,
  handleSuccessfullSignUpColoc,
  handleSuccessfullSignJoinColoc,
  updateCreateGroupColocError,
  updateJoinColocError,
  handleSuccessfullProfile,
  createUserProfile,
  updateProfileError,
  joinColocationSuccess,
  updateEditedProfileData,
  handleSuccessfullParam,
  updateEditedParamData,
  getAllUsers,
  persistValuesState,
  setCreatedColocation,
  toggleAvailableStatusState,
  togglePetProfile,
  toggleAvailableProfile,
  setError,
  uploadAvatar,
  uploadAvatarSuccess,
  uploadAvatarFailure,
  logoutAfterDelete,
  reloadAvatar,
} = userSlice.actions;
