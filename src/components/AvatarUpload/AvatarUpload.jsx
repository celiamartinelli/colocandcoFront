import './AvatarUpload.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function AvatarUpload() {
  const dispatch = useDispatch();
  const [editAvatar, setEditAvatar] = useState(false);
  const avatarFile = useSelector((state) => state.user.avatar_file);
  console.log(avatarFile);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    if (file) {
      dispatch({
        type: 'UPLOAD_AVATAR',
        payload: { file, fileName: file.name, fileSize: file.size },
      });
      setEditAvatar(false);

      try {
        dispatch({
          type: 'UPLOAD_AVATAR_SUCCESS',
          payload: { file, fileName: file.name, fileSize: file.size },
        });
        console.log('data create avatar', dispatch);
      } catch (error) {
        dispatch({ type: 'UPLOAD_AVATAR_FAILURE', payload: error.message });
        console.log("Erreur lors du téléchargement de l'avatar:", error);
      }
    } else {
      console.log('Aucun fichier sélectionné');
    }
  };

  const toggleEditAvatar = () => {
    setEditAvatar(!editAvatar);
  };

  return (
    <div className="containerAvatar">
      <button
        type="button"
        onClick={toggleEditAvatar}
        className="containerAvatar__edit__button"
        aria-label="Choisir un avatar"
      >
        <FontAwesomeIcon icon={faCamera} />
        {editAvatar ? 'Annuler' : ''}
      </button>
      {editAvatar && (
        <form
          className="containerAvatar__formUpload"
          encType="multipart/form-data"
          onSubmit={handleUpload}
        >
          <input
            className="containerAvatar__formUpload__input"
            type="file"
            name="file"
          />
          <button className="containerAvatar__formUpload__button" type="submit">
            {' '}
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </form>
      )}
      {avatarFile && <img src={avatarFile} alt="Avatar" />}
    </div>
  );
}
