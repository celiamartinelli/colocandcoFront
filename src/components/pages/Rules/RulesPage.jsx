import './RulesPage.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function RulesPage() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showRulesContent, setShowRulesContent] = useState([]);

  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });
  const content = useSelector((state) => state.feature.content);
  // Show rules content
  useEffect(() => {
    dispatch({ type: 'GET_RULES_CONTENT' });
  }, []);

  // show rules content modification
  useEffect(() => {
    if (content[0]?.content) {
      setShowRulesContent(content[0].content);
    }
  }, [content]);

  // toogle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // modification in the input
  const handleRulesChange = (event) => {
    setShowRulesContent(event.target.value);
  };

  // validation of the form sends modification to the database and refresh data modify
  const handleValidation = (e) => {
    e.preventDefault();
    dispatch({ type: 'PATCH_RULES', payload: showRulesContent });
    dispatch({ type: 'GET_RULES', payload: showRulesContent });
    setEditMode(false);
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
      <div className="container__T">
        {isMobile ? (
          <div className="container__T__header">
            <Header />
          </div>
        ) : (
          <div className="container__T__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}
        <div className="container__F__title">
          <h2 className="container__F__title__page">Règlement Intérieur</h2>
          <h3 className="container__F__title__h3">
            Etablissez vos règles de vie commune
          </h3>
        </div>
        <div className="container__R">
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
                onClick={handleValidation}
                className="container__P__title__edit__buttonSave"
              >
                Sauvegarder
              </button>
            )}
          </div>
          <div className="container__R__main">
            {editMode ? (
              <textarea
                className="container__R__main__form__rules"
                onChange={handleRulesChange}
                value={showRulesContent}
              />
            ) : (
              <div className="container__R__main__form">
                {content.length > 0 &&
                  content.map((rule) => (
                    <div key="1">
                      {rule.content.split('\n').map((article, index) => (
                        <p key={index}> {article} </p>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="container__content__footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
