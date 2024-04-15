// Avatar
import { reloadAvatar, uploadAvatar } from '../userSlice';

const AvatarCreateMiddleware = (store) => (next) => (action) => {
  if (action.type === 'UPLOAD_AVATAR') {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    console.log(action);
    formData.append('file', action.payload.file);
    console.log(action.payload.file);
    console.log(formData);
    console.log(formData.get('file'));

    const file = formData.get('file');
    console.log(file);

    fetch(`http://localhost:3000/user/upload_avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        // console.log('réponse AvatarCreateMiddleware:', res);
        if (res.status === 413) {
          throw new Error('Le fichier est trop grand');
        }
        if (!res.ok) {
          throw new Error("Erreur lors de la création de l'avatar");
        }
        return res.json();
      })
      .then((avatar) => {
        console.log('data create avatar', avatar);
        store.dispatch(uploadAvatar(avatar));
        store.dispatch({ type: 'UPLOAD_AVATAR_SUCCESS', payload: avatar });
        store.dispatch(reloadAvatar());
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement de l'avatar:", error);
      });
  }

  // Call the next middleware or the reducer in the chain
  next(action);
};

export default AvatarCreateMiddleware;
