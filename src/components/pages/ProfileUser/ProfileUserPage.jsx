import './ProfileUserPage.scss';
import { updateEditedProfileData } from '../../../store/userSlice';
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
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';
import Allergies from '../../Allergies/Allergies';

export default function ProfileUserPage() {
  const dispatch = useDispatch();
  const { colocId } = useParams();
  const logged = useSelector((state) => state.user.logged);

  const [toggleReact, setToggleReact] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });

  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    // Récupérer le règlement lors du chargement du composant
    dispatch({ type: 'GET_ALL_USERS' });
  }, []);

  const users = useSelector((state) => state.user.users);

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (users && colocId) {
      const colocataireData = users.find(
        (user) => user.id === parseInt(colocId)
      );
      if (colocataireData) {
        setEditingData(colocataireData);
      }
    }
  }, [users, colocId]);

  const toggleToggle = () => {
    setToggleReact(!toggleReact);
  };
  const toggleEditMode = () => {
    // if userlogged yes otherwise no profile modification
    if (logged) {
      setEditMode(!editMode);
    }
  };

  const handleProfileChange = (event) => {
    if (editMode) {
      const { name, value } = event.target;
      setEditingData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = (e) => {
    // Dispatchez l'action pour mettre à jour les données avec l'état d'édition
    e.preventDefault();
    dispatch({ type: 'PATCH_USER_INFORMATIONS', payload: editingData });
    // get out editmode
    setEditMode(false);
  };

  function calculateAge(birthdate) {
    const diff = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  const { birthdate } = editingData;

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
          {editingData.avatar_file ? (
            <img
              src={`http://localhost:3000/${editingData.avatar_file}`}
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
          <h5 className="container__P__title__name">
            {editingData.firstname
              ? `${editingData.firstname} ${editingData.lastname}`
              : 'Bienvenue'}
          </h5>
          {userData.id === editingData.id ? (
            <button
              type="button"
              className="container__P__title__button"
              onClick={toggleEditMode}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="container__P__title__button__icone"
              />

              {logged && editMode ? 'Annuler' : 'Modifier le profil'}
            </button>
          ) : null}
        </div>
        <div className="container__P__main">
          <div className="container__P__main__section">
            {editingData.birthdate && (
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
                {logged && editMode ? (
                  <input
                    className="container__P__main__section__article__input"
                    type="date"
                    name="birthdate"
                    value={format(
                      parseISO(editingData.birthdate),
                      'yyyy-MM-dd'
                    )}
                    placeholder="00/00/0000"
                    onChange={handleProfileChange}
                  />
                ) : (
                  <p className="container__P__main__section__article__paraph">
                    {format(parseISO(editingData.birthdate), 'dd/MM/yyyy')} -{' '}
                    {calculateAge(birthdate)} ans
                  </p>
                )}
              </div>
            )}
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
              {logged && editMode ? (
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
                  {editingData.profession}
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
              {logged && editMode ? (
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
                  {editingData.worktime_table}
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
                  value={editingData.pet}
                >
                  {editingData.pet ? (
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
              {logged && editMode ? (
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
                    {editingData.emergency_name}
                  </p>
                  <p className="container__P__main__section__article__paraph">
                    {editingData.emergency_link}
                  </p>
                  <p className="container__P__main__section__article__paraph">
                    {editingData.emergency_number}
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
              {logged && editMode ? (
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
                  {editingData.phone_number}
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
              {logged && editMode ? (
                <textarea
                  className="container__P__main__section__article__description"
                  type="text"
                  name="description"
                  value={editingData.description}
                  placeholder="lorem ipsum is simply dummy text of the printing and typesetting industry."
                  onChange={handleProfileChange}
                />
              ) : (
                <p className="container__P__main__section__article__paraph">
                  {editingData.description}
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

              {/* {editMode ? ( 
                 <div>
                  <p>Quel est ton poison?</p>
                  <select>
                    <option value="Gluten">Gluten</option>
                    <option value="Lactose">Lactose</option>
                    <option value="Oeufs">Oeufs</option>
                    <option value="Arachides">Arachides</option>
                    <option value="Fruits de Mer">Fruits de Mer</option>
                  </select>
                </div>  */}

              <div>
                <Allergies />
              </div>
            </div>
          </div>
        </div>

        {logged && editMode && (
          <button
            type="button"
            onClick={handleSave}
            className="container__P__title__button"
          >
            Sauvegarder
          </button>
        )}
        <div className="container__P__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
