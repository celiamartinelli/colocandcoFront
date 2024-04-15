import './ProfilePage.scss';
import Header from '../../Header/Header';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';
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
import { updateEditedProfileData } from '../../../store/userSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [toggleReact, setToggleReact] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editingBirthDate, setEditingBirthDate] = useState('');
  const [editingProfession, setEditingProfession] = useState('');
  const [editingWorkTimetable, setEditingWorkTimetable] = useState('');
  const [editingEmergencyName, setEditingEmergencyName] = useState('');
  const [editingEmergencyLink, setEditingEmergencyLink] = useState('');
  const [editingEmergencyNumber, setEditingEmergencyNumber] = useState('');

  const birthDate = useSelector((state) => state.user.birthDate);
  const profession = useSelector((state) => state.user.profession);
  const workTimetable = useSelector((state) => state.user.work_time_table);
  const emergencyName = useSelector((state) => state.user.emergency_name);
  const emergencyLink = useSelector((state) => state.user.emergency_link);
  const emergencyNumber = useSelector((state) => state.user.emergency_number);

  const toggleToggle = () => {
    setToggleReact(!toggleReact);
  };
  const toggleEditMode = () => {
    if (!editMode) {
      setEditingBirthDate(birthDate);
    }
    setEditMode(!editMode);
  };

  return (
    <div className="container">
      <div className="container__nav">
        <FeatureMenu />
      </div>
      <div className="container__content">
        <div className="container__content__header">
          <Header />
        </div>
        <div className="container__content__title">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
          <FontAwesomeIcon icon={faPen} />
          <button
            type="button"
            className="container__content__title__button"
            onClick={toggleEditMode}
          >
            <FontAwesomeIcon icon={faPen} />
            {editMode ? 'Annuler' : 'Modifier le profil'}
          </button>
          <h5>Nom et Prénom</h5>
        </div>
        <div className="container__content__main">
          <div className="container__content__main__section">
            <div className="container__content__main__section__article">
              <FontAwesomeIcon icon={faCakeCandles} />
              <h5>{editMode ? 'Anniversaire' : 'Anniversaire'}</h5>
              {editMode ? (
                <input
                  className="containerSign__form__input"
                  type="date"
                  name="birthDate"
                  value={editingBirthDate}
                  placeholder="00/00/0000"
                  onChange={(e) => setEditingBirthDate(e.target.value)}
                />
              ) : (
                <p>{birthDate}</p>
              )}
            </div>
            <div className="container__content__main__section__article">
              <FontAwesomeIcon icon={faBriefcase} />
              <h5>{editMode ? 'Travail' : 'Travail'}</h5>
              {editMode ? (
                <input
                  className="containerSign__form__input"
                  type="text"
                  name="profession"
                  value={editingProfession}
                  placeholder="Métier"
                  onChange={(e) => setEditingProfession(e.target.value)}
                />
              ) : (
                <p>{profession}</p>
              )}
            </div>
            <div className="container__content__main__section__article">
              <FontAwesomeIcon icon={faClock} />
              <h5>{editMode ? 'Horaire de Travail' : 'Horaire de Travail'}</h5>
              {editMode ? (
                <input
                  className="containerSign__form__input"
                  type="text"
                  name="work_time_table"
                  value={editingWorkTimetable}
                  placeholder="00h-00h"
                  onChange={(e) => setEditingWorkTimetable(e.target.value)}
                />
              ) : (
                <p>{workTimetable}</p>
              )}
            </div>
            <h5>Animaux</h5>
            <FontAwesomeIcon icon={faPaw} />
            <div
              className="Menu__profile__toggle"
              role="button"
              tabIndex={0}
              onClick={toggleToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleToggle();
                }
              }}
            >
              {toggleReact ? (
                <FontAwesomeIcon icon={faToggleOn} size="2xl" />
              ) : (
                <FontAwesomeIcon icon={faToggleOff} size="2xl" />
              )}
            </div>
            <div className="container__content__main__section__article">
              <FontAwesomeIcon icon={faHeartPulse} />
              <h5>
                {editMode ? 'Personne à prévenir' : 'Personne à prévenir'}
              </h5>
              {editMode ? (
                <>
                  <input
                    className="containerSign__form__input"
                    type="text"
                    name="emergency_name"
                    value={editingEmergencyName}
                    placeholder="Mme Dubois"
                    onChange={(e) => setEditingEmergencyName(e.target.value)}
                  />
                  <input
                    className="containerSign__form__input"
                    type="text"
                    name="emergency_link"
                    value={editingEmergencyLink}
                    placeholder="Maman"
                    onChange={(e) => setEditingEmergencyLink(e.target.value)}
                  />
                  <input
                    className="containerSign__form__input"
                    type="number"
                    name="emergency_number"
                    value={editingEmergencyNumber}
                    placeholder="00.00.00.00.00."
                    onChange={(e) => setEditingEmergencyNumber(e.target.value)}
                  />
                </>
              ) : (
                <div>
                  <p>{emergencyName}</p>
                  <p>{emergencyLink}</p>
                  <p>{emergencyNumber}</p>
                </div>
              )}
            </div>
          </div>
          <div className="container__content__main__section">
            <h5>Téléphone</h5>
            <FontAwesomeIcon icon={faPhone} />
            <p>00.00.00.00.00.</p>
            <h5>Description</h5>
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>lorem ipsum </p>
            <h5>Allergies</h5>
            <FontAwesomeIcon icon={faWheatAwnCircleExclamation} />
            <p>Gluten, lactose, oeufs</p>
          </div>
          {editMode && (
            <button
              type="button"
              onClick={() =>
                dispatch(
                  updateEditedProfileData({
                    field: 'birthDate',
                    value: editingBirthDate,
                  })
                )
              }
            >
              Sauvegarder
            </button>
          )}
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
