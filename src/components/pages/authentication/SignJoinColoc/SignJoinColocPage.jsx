import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import './SignJoinColocPage.scss';
import {
  changeSignJoinColocInputValue,
  joinColocationSuccess,
} from '../../../../store/userSlice';

export default function SignJoinColocPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Import codeColoc , email , password , confirmPassword from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const codecoloc = useSelector((state) => state.user.codecoloc);
  const password = useSelector((state) => state.user.password);
  const confirmpassword = useSelector((state) => state.user.confirmpassword);

  // add a useState to verify if password and confirmPassword match
  const [passwordMatch, setPasswordMatch] = useState(true);
  // add a useState to show/hide the password/confirmaPassword when the eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Reset the error message when the user types in the confirmPassword field
    setPasswordMatch(true);
  }, [confirmpassword]);

  return (
    <>
      <NavLink to="/signup">
        <FontAwesomeIcon icon={faArrowLeft} />
        retour à l'inscription
      </NavLink>
      <HeaderSign />
      <div className="containerSign">
        <HeaderSignTitle />
        <div className="containerSign__header">
          <h2 className="containerSign__title">Rejoindre une Colocation</h2>
        </div>

        <form
          className="containerSign__form"
          onSubmit={(e) => {
            e.preventDefault();
            // Check if the password matches the confirmPassword
            if (password === confirmpassword) {
              console.log('submit ok : password = confirmPassword');
              dispatch({ type: 'JOIN_GROUP_AND_CREATE_USER' });
              // when the visitor submit to signup, dispatch of the action joinColocationSuccess to the userSlice
              dispatch(joinColocationSuccess());
              // redirect the new user to login page to connect
              navigate('/login');
            } else {
              console.log(
                'submit pas ok : password  ne correspond pas à confirmPassword'
              );
              // afficher un message d'erreur
              // if the paswword doesn't match with the confirmPassword
              // It modifiy the passwordMatch state to "false" and show an error in the UI
              setPasswordMatch(false);
            }
          }}
        >
          <label htmlFor="codecoloc" className="containerSign__form__label">
            {' '}
            Code de la Colocation:
            <input
              className="containerSign__form__input"
              type="text"
              name="codecoloc"
              value={codecoloc}
              placeholder="Code Colocation"
              onChange={(e) => {
                // Dispatch the action to update the codeColoc value in the store
                const action = changeSignJoinColocInputValue({
                  input: 'codecoloc',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>

          <label htmlFor="email" className="containerSign__form__label">
            {' '}
            Email :
            <input
              className="containerSign__form__input"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                // Dispatch the action to update the email value in the store
                const action = changeSignJoinColocInputValue({
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              placeholder="Mot de passe"
              onChange={(e) => {
                // Dispatch the action to update the password value in the store
                const action = changeSignJoinColocInputValue({
                  input: 'password',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
            <div className="containerSign__form__input__toggle__eye">
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

          <label
            htmlFor="confirmpassword"
            className="containerSign__form__label"
          >
            {' '}
            Confirmer le mot de passe:
            <input
              className="containerSign__form__input"
              type="password"
              name="confirmpassword"
              value={confirmpassword}
              placeholder="Confirmation de Mot de passe"
              onChange={(e) => {
                // Dispatch the action to update the password value in the store
                const action = changeSignJoinColocInputValue({
                  input: 'confirmpassword',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>

          {/*  Display an error message if password and confirmPassword are differents (conditional rendering) */}
          {!passwordMatch && (
            <p className="containerSign__form__error">
              Les mots de passe ne correspondent pas
            </p>
          )}
          {/* Show the error message if there is any */}

          <button type="submit" className="containerSign__form__button">
            Rejoindre la colocation
          </button>
        </form>
        <div className="containerSign__footer">
          <NavLink to="/login" className="containerSign__footer__link">
            Vous possédez déjà un compte Coloc&Co? Cliquez-ici!
          </NavLink>
        </div>
      </div>
    </>
  );
}
