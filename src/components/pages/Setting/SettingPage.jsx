import './SettingPage.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faSkullCrossbones,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

export default function SettingPage() {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [editingParamData, setEditingParamData] = useState({});
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });

  const settingUser = useSelector((state) => state.user.settingUser);
  console.log(settingUser);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Show data after modification
  useEffect(() => {
    if (settingUser) {
      setEditingParamData(settingUser);
    }
  }, [settingUser]);

  const handleParameterChange = (event) => {
    const { name, value } = event.target;
    setEditingParamData((prevParamData) => ({
      ...prevParamData,
      settingInfo: {
        ...prevParamData.settingInfo,
        userInfo: {
          ...prevParamData.settingInfo?.userInfo,
          [name]: value,
        },
        colocInfo: {
          ...prevParamData.settingInfo?.colocInfo,
          [name]: value,
        },
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'PATCH_USER_PARAM', payload: editingParamData });
    setEditingParamData(settingUser);
    setEditMode(false);
  };

  // on click delete account , open the confirmation modal
  const handleDelete = () => {
    setConfirmationOpen(true);
  };

  // after the user confirms the deletion
  const handleConfirmDelete = async () => {
    try {
      const userId = settingUser.settingInfo?.userInfo?.id;
      dispatch({
        type: 'DELETE_USER',
        payload: userId,
      });
      dispatch({ type: 'LOGOUT' });

      setConfirmationOpen(false);
    } catch (error) {
      setConfirmationOpen(false);
    }
  };

  // If the user clicks on the cancel button
  const handleCancelDelete = () => {
    setConfirmationOpen(false);
  };

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
      <div className="container__F">
        {isMobile ? (
          <div className="container__F__header">
            <Header />
          </div>
        ) : (
          <div className="container__F__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}
        <div className="container__F__title">
          <h5 className="container__F__title__page">Mon compte</h5>
          <p className="container__S__title__p">
            Préservez la confidentialité de vos données personnelles.
          </p>
          <div className="container__S__title__edit">
            <button
              type="button"
              className="container__S__title__button"
              onClick={toggleEditMode}
            >
              <FontAwesomeIcon icon={faPen} />
              {editMode ? 'Annuler' : 'Modifier les paramètres'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleSave}
                className="container__S__title__edit__buttonSave"
              >
                Sauvegarder
              </button>
            )}
          </div>
        </div>
        <div className="container__S__main">
          {/* userInfo */}
          <div className="container__S__main__section">
            <div className="container__S__main__section__article">
              <h5 className="container__S__main__section__article__infos">
                Colocataire
              </h5>
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Prénom
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="firstname"
                  value={
                    editingParamData.settingInfo?.userInfo?.firstname || ''
                  }
                  placeholder="Marcel"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.firstname || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Nom
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="lastname"
                  value={editingParamData.settingInfo?.userInfo?.lastname || ''}
                  placeholder="Dupont"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.lastname || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Adresse mail
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="email"
                  name="email"
                  value={editingParamData.settingInfo?.userInfo?.email || ''}
                  placeholder="coloc@gmail.com"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.email || ''}
                </p>
              )}
            </div>
            {/*
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Mot de passe
                </h5>
              </div>
              {editMode ? (
                <>
                  <input
                    className="container__S__main__section__article__input"
                    type="password"
                    name="password"
                    value={
                      editingParamData.settingInfo?.userInfo?.password || ''
                    }
                    placeholder=""
                    onChange={handleParameterChange}
                  />
                   <input
                    className="container__S__main__section__article__input"
                    type="password"
                    name="confirmPassword"
                    value={editingParamData.confirmPassword || ''}
                    placeholder=""
                    onChange={handleParameterChange}
                  />
                 
                </>
              ) : (
                <div>
                  <p className="container__S__main__section__article__paraph">
                    {settingUser.settingInfo?.userInfo?.password || ''}
                  </p>
                </div>
              )}
            </div>
             */}
          </div>
          {/* colocInfo */}
          <div className="container__S__main__section">
            <div className="container__S__main__section__article">
              <h5 className="container__S__main__section__article__infos">
                Colocation
              </h5>
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Nom de la Colocation
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="group_name"
                  value={
                    editingParamData.settingInfo?.colocInfo?.group_name || ''
                  }
                  placeholder=""
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.colocInfo?.group_name || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Adresse
                </h5>
              </div>
              {editMode ? (
                <textarea
                  className="container__S__main__section__article__description"
                  type="text"
                  name="address"
                  value={editingParamData.settingInfo?.colocInfo?.address || ''}
                  placeholder=""
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.colocInfo?.address || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Code Colocation
                </h5>
              </div>

              <p className="container__S__main__section__article__paraph">
                {settingUser.settingInfo?.colocInfo?.code_coloc || ''}
              </p>
            </div>
          </div>
        </div>

        <div className="container__S__delete">
          <button
            type="button"
            onClick={handleDelete}
            className="container__S__delete__button"
          >
            Supprimer le compte
          </button>
          {isConfirmationOpen && (
            <div className="delete__confirmation">
              <div className="delete__confirmation__headder">
                <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />
                <h5>Suppression de compte</h5>
                <FontAwesomeIcon icon={faSkullCrossbones} size="xl" />
              </div>
              <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>

              <button type="button" onClick={handleConfirmDelete}>
                Oui
              </button>
              <button type="button" onClick={handleCancelDelete}>
                Annuler
              </button>
            </div>
          )}
        </div>
        <div className="container__S__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
