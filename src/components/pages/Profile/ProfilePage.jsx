import './ProfilePage.scss';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faPen,
  faPaw,
  faToggleOn,
  faToggleOff,
  faCakeCandles,
  faBriefcase,
  faClock,
  faHeartPulse,
  faPhone,
  faPenToSquare,
  faWheatAwnCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

import Allergies from '../../Allergies/Allergies';
import { togglePetProfile, uploadAvatar } from '../../../store/userSlice';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import AvatarUpload from '../../AvatarUpload/AvatarUpload';

export default function ProfilePage() {
  const dispatch = useDispatch();

  // const [toggleReact, setToggleReact] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });

  const [editingData, setEditingData] = useState({});
  // console.log('----> editing', editingData);

  // stocker l'url de l'image
  const [previewUrl, setPreviewUrl] = useState('');

  const formatDate = (date) => {
    if (!date) return ''; // Ajoutez cette vérification pour éviter les dates indéfinies
    return format(parseISO(date), 'dd/MM/yyyy');
  };

  useEffect(() => {
    // Get user informations when loading the component
    dispatch({ type: 'GET_USER_INFORMATIONS' });
  }, [dispatch]);

  const userData = useSelector((state) => state.user.userData);
  console.log('userData', userData.avatar_file);

  // faire apparaitre les données après modification
  useEffect(() => {
    // console.log('Useeffect', userData[0]);
    if (userData) {
      // console.log('Profile', userData);
      setEditingData(userData);
    }
  }, [userData]);

  /* const toggleToggle = () => {
    setToggleReact(!toggleReact);
  }; */
  const toggleEditMode = () => {
    // si userlogged oui sinon pas de modification de profil
    setEditMode(!editMode);
    //  console.log('toggleEditMode');
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log('---> handleProfileChange', name, value);
  };

  const handleSave = (e) => {
    // Dispatchez l'action pour mettre à jour les données avec l'état d'édition
    e.preventDefault();
    dispatch({ type: 'PATCH_USER_INFORMATIONS', payload: editingData });
    // get out of edit mode
    setEditMode(false);
  };
  // Show age next to date of birth
  function calculateAge(birthdate) {
    const diff = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const { birthdate } = userData;

  return (
    <div className="container">
      {isMobile ? (
        <div className="container__nav">
          <FeatureMenu />
        </div>
      ) : (
        <div className="container__nav__phone">
          <FeatureMenuPhone />
        </div>
      )}
      <div className="container__P">
        {isMobile ? (
          <div className="container__P__header">
            <Header />
          </div>
        ) : (
          <div className="container__P__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}

        <div className="container__P__title">
          <div className="container__P__title__user">
            {userData.avatar_file ? (
              <img
                src={`http://localhost:3000/${userData.avatar_file}`}
                // src={userData.avatar_file}
                alt="Avatar"
                className="container__P__title__file"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                size="2xl"
                className="container__P__title__avatar"
              />
            )}
            <AvatarUpload />

            <h5 className="container__P__title__name">
              {userData.firstname
                ? `${userData.firstname} ${userData.lastname}`
                : 'Bienvenue'}
            </h5>
          </div>
          <div className="container__P__title__edit">
            <button
              type="button"
              className="container__P__title__edit__button"
              onClick={toggleEditMode}
            >
              {editMode ? 'Annuler' : 'Modifier le profil'}
              <FontAwesomeIcon
                icon={faPen}
                className="container__P__title__edit__button__icone"
              />
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleSave}
                className="container__P__title__edit__buttonSave"
              >
                Sauvegarder
              </button>
            )}
          </div>
        </div>
        <div className="container__P__main">
          <div className="container__P__main__section">
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faCakeCandles}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Anniversaire
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__P__main__section__article__input"
                  type="date"
                  name="birthdate"
                  value={format(parseISO(editingData.birthdate), 'yyyy-MM-dd')}
                  placeholder="00/00/0000"
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {formatDate(userData.birthdate)} - {calculateAge(birthdate)}{' '}
                  ans
                </p>
              )}
            </div>
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Travail
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__P__main__section__article__input"
                  type="text"
                  name="profession"
                  value={editingData.profession}
                  placeholder="Métier"
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {userData.profession}
                </p>
              )}
            </div>

            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faClock}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Horaire de Travail
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__P__main__section__article__input"
                  type="text"
                  name="worktime_table"
                  value={editingData.worktime_table}
                  placeholder="00h-00h"
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {userData.worktime_table}
                </p>
              )}
            </div>
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faPaw}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Animaux
                </h5>
              </div>
              <div className="container__P__main__section__article__header__main">
                <p className="container__P__main__section__article__paraph">
                  Possède-tu des animaux?
                </p>
                <div
                  className="container__P__main__section__article__header__main__toggle"
                  role="button"
                  tabIndex={0}
                  name="pet"
                  value={userData.pet}
                  onClick={() => {
                    const action = togglePetProfile(userData.pet);
                    dispatch(action);
                    dispatch({
                      type: 'PATCH_USER_INFORMATIONS',
                    });
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      const action = togglePetProfile(userData.pet);
                      dispatch(action);
                      dispatch({
                        type: 'PATCH_USER_INFORMATIONS',
                      });
                    }
                  }}
                >
                  {userData.pet ? (
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      size="xl"
                      style={{ color: '#4fd166' }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      size="xl"
                      style={{ color: '#1a4581' }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faHeartPulse}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Personne à prévenir
                </h5>
              </div>
              {editMode ? (
                <>
                  <input
                    className="container__P__main__section__article__input"
                    type="text"
                    name="emergency_name"
                    value={editingData.emergency_name}
                    placeholder="Mme Dubois"
                    onChange={handleProfileChange}
                  />
                  <input
                    className="container__P__main__section__article__input"
                    type="text"
                    name="emergency_link"
                    value={editingData.emergency_link}
                    placeholder="Maman"
                    onChange={handleProfileChange}
                  />
                  <input
                    className="container__P__main__section__article__input"
                    type="tel"
                    name="emergency_number"
                    value={editingData.emergency_number}
                    placeholder="00.00.00.00.00."
                    onChange={handleProfileChange}
                  />
                </>
              ) : (
                <div>
                  <p className="container__P__main__section__article__paraph">
                    {userData.emergency_name}
                  </p>
                  <p className="container__P__main__section__article__paraph">
                    {userData.emergency_link}
                  </p>
                  <p className="container__P__main__section__article__paraph">
                    {userData.emergency_number}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="container__P__main__section">
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Téléphone
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__P__main__section__article__input"
                  type="tel"
                  name="phone_number"
                  value={editingData.phone_number}
                  placeholder="00.00.00.00.00."
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {userData.phone_number}
                </p>
              )}
            </div>
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Description
                </h5>
              </div>
              {editMode ? (
                <textarea
                  className="container__P__main__section__article__description"
                  type="text"
                  name="description"
                  value={editingData.description}
                  placeholder="Décris toi en quelque mots"
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {userData.description}
                </p>
              )}
            </div>
            <div className="container__P__main__section__article">
              <div className="container__P__main__section__article__header">
                <FontAwesomeIcon
                  icon={faWheatAwnCircleExclamation}
                  className="container__P__main__section__article__header__icone"
                />
                <h5 className="container__P__main__section__article__header__title">
                  Allergies
                </h5>
              </div>
              <div>
                <Allergies />
              </div>
            </div>
          </div>
        </div>

        <div className="container__P__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
