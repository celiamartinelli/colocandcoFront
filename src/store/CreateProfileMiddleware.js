// PROFILE CREATION
import { createUserProfile, updateProfileError } from './userSlice';

const CreateProfileMiddleware = (store) => (next) => (action) => {
  // Call API to create user profile when we dispatch CREATE_PROFILE action on CreateProfilePage.jsx
  if (action.type === 'CREATE_PROFILE') {
    console.log('CREATE_PROFILE action detected');

    const formData = new FormData();

    formData.append('firstname', store.getState().user.firstname);
    formData.append('lastname', store.getState().user.lastname);
    formData.append('phonenumber', store.getState().user.phonenumber);
    formData.append('birthDate', store.getState().user.birthDate);
    formData.append('avatarFile', store.getState().user.avatarFile);

    fetch('http://localhost:3000/???', {
      // POST : method on the API's server
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      // User-entered data (email and password)from the state (Redux store)
      // These values are  entered by the user in the input fields in CreateProfilePage
      body: formData,
    })
      // receive the response(data) in json format
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        // Dispatch the action to update the store (userSlice)
        const createProfileAction = createUserProfile(data);
        console.log('createProfileAction:', createProfileAction);

        store.dispatch(createProfileAction);
      })

      .catch((error) => {
        // Dispatch the action to update the store with login error message
        store.dispatch(updateProfileError(error.message));
      });
  }
  return next(action);
};
export default CreateProfileMiddleware;
