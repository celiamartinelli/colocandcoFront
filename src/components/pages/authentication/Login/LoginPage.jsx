import './LoginPage.scss';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { changeLoginInputValue } from '../../../../store/userSlice';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';

import Modal from '../../../Modal/Modal';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdColocation = useSelector(
    (state) => state.user.createdColocation
  );
  // add a useState to show/hide the password/confirmaPassword when the eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);
  const joinedColocation = useSelector((state) => state.user.joinedColocation);

  // Import email, password, logged state, error, joinedColocation from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const logged = useSelector((state) => state.user.logged);

  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    // Redirect to /home if the user is logged in
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  return (
    <div>
      <div className="headerSign">
        <NavLink to="/welcome">
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <HeaderSign />
      </div>
      <div className="containerSign">
        <HeaderSignTitle />
        <div className="containerSign__main">
          <div className="containerSign__main__header">
            <h2 className="containerSign__main__titleSign">Connexion</h2>
            <form
              className="containerSign__main__form"
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the default form submission
                // Dispatch the 'SUBMIT_LOGIN' action to loginMiddleware when the form is submitted
                dispatch({ type: 'SUBMIT_LOGIN' });
              }}
            >
              <label
                htmlFor="email"
                className="containerSign__main__form__label"
              >
                {' '}
                Email :
                <input
                  className="containerSign__main__form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    // Dispatch the action to update the email value in the store
                    const action = changeLoginInputValue({
                      input: 'email',
                      value: e.target.value,
                    });
                    dispatch(action);
                  }}
                />
              </label>
              <label
                htmlFor="password"
                className="containerSign__main__form__label"
              >
                {' '}
                Mot de passe:
                <input
                  className="containerSign__main__form__input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    // Dispatch the action to update the password value in the store
                    const action = changeLoginInputValue({
                      input: 'password',
                      value: e.target.value,
                    });
                    dispatch(action);
                  }}
                />
                <div className="containerSign__main__form__input__toggle__eye">
                  {/* Use showPassword to toggle between the icons */}
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </label>
              {/* Show the error message if there is any */}
              {error && (
                <p className="containerSign__main__form__error">{error}</p>
              )}

              {/* For MVP 2.0 version

         
          <button
            className="containerSign__link"
            type="button"
            onClick={handleResetPasswordPop}
          >
            Mot de passe oublié?
          </button>
          
          {showResetPssword && (
            <div className="popUp__resetPassword">
              <button type="button" onClick={() => setShowResetPssword(false)}>
                X
              </button>

              <h4 className="popUp__resetPassword__tittle">
                Réinitialiser le mot de passe
              </h4>
              <p className="popUp__resetPassword__underTitle">
                Entrez votre adresse e-mail ci-dessous et vous recevrez un
                e-mail avec un lien pour réinitialiser votre mot de passe.
              </p>
              <form
                className="popUp__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Submit email');
                }}
              >
                <label htmlFor="email" className="popUp__form__label">
                  {' '}
                  Email :
                  <input
                    className="popUp__form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      // Dispatch the action to update the email value in the store
                      const action = changeLoginInputValue({
                        input: 'email',
                        value: e.target.value,
                      });
                      dispatch(action);
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="popUp__resetPassword__button"
                  onClick={handleResetPasswordPop}
                >
                  Envoyer
                </button>
              </form>
            </div>
          )}

          <label htmlFor="rememberMe" className="containerSign__form__checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              value={rememberMe}
              onChange={() => dispatch(toggleRememberMe())}
            />
            Se souvenir de moi
          </label>
          */}
              {/* modal s'affiche si created colocation est true et pareil pour joincoloc */}
              {(createdColocation && <Modal />) ||
                (joinedColocation && <Modal />)}
              <button
                type="submit"
                className="containerSign__main__form__button"
              >
                Connexion
              </button>
            </form>
            <NavLink to="/signup" className="containerSign__main__link">
              Nouveau sur Coloc&co? Créer ton Compte!
            </NavLink>

            {/*     {(createdColocation && <Modal />) || (joinedColocation && <Modal />)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

/*  We are using propTypes which gives informations about what is expected by a component 
LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
 */
