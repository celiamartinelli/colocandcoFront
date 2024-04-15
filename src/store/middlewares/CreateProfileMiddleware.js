// PROFILE CREATION
import {
  createUserProfile,
  updateProfileError,
  setCreatedColocation,
  handleSuccessfullProfile,
} from '../userSlice';

const createProfileMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  // Call API to create user profile when we dispatch CREATE_PROFILE action on CreateProfilePage.jsx
  if (action.type === 'CREATE_PROFILE') {
    // console.log('CREATE_PROFILE action detected');

    fetch('http://localhost:3000/user/update_profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      mode: 'cors',
      body: JSON.stringify({
        firstname: store.getState().user.firstname,
        lastname: store.getState().user.lastname,
        birthdate: store.getState().user.birthdate,
        phone_number: store.getState().user.phone_number,
      }),
    })
      // receive the response(data) in json formats
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        // console.log('WHAT THAT ?');
        if (data.token) {
          localStorage.setItem('token', data.token);
          //  console.log('token:>>', data.token);
        }
        const { result } = data;
        localStorage.setItem('user', JSON.stringify(result[0]));
        // Dispatch the action to update the store (userSlice)
        const createProfileAction = handleSuccessfullProfile({
          ...data.result[0],
        });
        // const { result } = data;
        store.dispatch(createProfileAction);
        //  console.log('Data dans le middleware after UPDATE USER----> : ', data);
      })

      .catch((error) => {
        // Dispatch the action to update the store with login error message
        store.dispatch(updateProfileError(error.message));
      });
  }
  return next(action);
};
export default createProfileMiddleware;
