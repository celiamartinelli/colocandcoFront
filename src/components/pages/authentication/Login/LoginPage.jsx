import './LoginPage.scss';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import {
  changeLoginInputValue,
  toggleRememberMe,
} from '../../../../store/userSlice';
import { useState } from 'react';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const dispatch = useDispatch();

  // Import email, password, logged state, error, joinedColocation from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const logged = useSelector((state) => state.user.logged);

  const error = useSelector((state) => state.user.error);
  const joinedColocation = useSelector((state) => state.user.joinedColocation);
  {
    /*
     const rememberMe = useSelector((state) => state.user.rememberMe);
  const [showResetPssword, setShowResetPssword] = useState(false);

  const handleResetPasswordPop = () => {
    if (showResetPssword) {
      dispatch(console.log('action pour reset password'));
      setShowResetPssword(false);
    } else {
      setShowResetPssword(true);
    }
  };
  */
  }
  if (logged) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <HeaderSign />
      <div className="containerSign">
        <HeaderSignTitle />

        <h2 className="containerSign__title">
          Connexion à votre espace colocation
        </h2>
        <form
          className="containerSign__form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission
            // Dispatch the 'SUBMIT_LOGIN' action to loginMiddleware when the form is submitted
            dispatch({ type: 'SUBMIT_LOGIN' });
          }}
        >
          <label htmlFor="email" className="containerSign__form__label">
            {' '}
            Email :
            <input
              className="containerSign__form__input"
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
          <label htmlFor="password" className="containerSign__form__label">
            {' '}
            Mot de passe:
            <input
              className="containerSign__form__input"
              type="password"
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
          </label>
          {/* Show the error message if there is any */}
          {error && <p className="containerSign__form__error">{error}</p>}
          {/*
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
          <button type="submit" className="containerSign__form__button">
            Connexion
          </button>
        </form>
        <div className="containerSign__footer">
          <NavLink to="/signup" className="containerSign__footer__link">
            Nouveau sur Coloc&co? Créer ton Compte!
          </NavLink>
        </div>
      </div>
    </>
  );
}

/*  We are using propTypes which gives informations about what is expected by a component 
LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
 */
