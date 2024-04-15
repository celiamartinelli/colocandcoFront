import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import {
  changeSignupInputValue,
  changeLoginInputValue,
} from '../../../../store/userSlice';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import './SignUpColocPage.scss';

export default function SignUpColocPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Import email, password, groupName from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const group_name = useSelector((state) => state.user.group_name);
  const confirm_password = useSelector((state) => state.user.confirm_password);
  const createdColocation = useSelector(
    (state) => state.user.createdColocation
  );
  // add a useState to store the email error state
  const [emailError, setEmailError] = useState('');

  // add a useState to verify if password and confirmPassword match
  const [passwordMatch, setPasswordMatch] = useState(true);
  // add a useState to show/hide the password/confirmaPassword when the eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);

  // Add a useState to manage the visibility of the error message when an input is empty
  const [errorMessageEmptyInput, setErrorMessageEmptyInput] = useState('');

  useEffect(() => {
    return () => {
      setEmailError('');
      setPasswordMatch(true);
      setErrorMessageEmptyInput('');
    };
  }, []);

  useEffect(() => {
    // When changing pages, reset all input values to their initial state
    return () => {
      dispatch(changeSignupInputValue({ input: 'email', value: '' }));
      dispatch(changeSignupInputValue({ input: 'group_name', value: '' }));
      dispatch(
        changeSignupInputValue({ input: 'confirm_password', value: '' })
      );
      dispatch(changeSignupInputValue({ input: 'password', value: '' }));
    };
  }, []);

  useEffect(() => {
    if (createdColocation) {
      dispatch(changeLoginInputValue({ input: 'email', value: '' }));
      dispatch(changeLoginInputValue({ input: 'password', value: '' }));
      navigate('/login');
    }
  }, [createdColocation]);

  return (
    <div>
      <div className="headerSign">
        <NavLink to="/signup">
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <HeaderSign />
      </div>
      <div className="containerSign">
        <HeaderSignTitle />
        <div className="containerSign__mainSign">
          <div className="containerSign__mainSign__header">
            <h2 className="containerSign__mainSign__titleSign">
              Créer une nouvelle Colocation
            </h2>
          </div>
          <form
            className="containerSign__mainSign__form"
            onSubmit={(e) => {
              e.preventDefault(); // Prevents the default form submission

              // Check if the email has a valid format using a regex

              // reset erro message on submit
              setEmailError('');
              setErrorMessageEmptyInput('');
              setPasswordMatch(true);

              // Check if all fields are filled
              if (!group_name || !email || !password || !confirm_password) {
                // Set the error message
                setErrorMessageEmptyInput(
                  'Veuillez renseigner tous les champs.'
                );
                return;
              }

              if (!emailRegex.test(email)) {
                // Set the email error state
                setEmailError("L'e-mail n'est pas au bon format");
                return;
              }
              // Check if the password matches the confirmPassword
              if (password === confirm_password) {
                dispatch({ type: 'CREATE_GROUP' });
              } else {
                // Show messag error
                // if the paswword doesn't match with the confirmPassword
                // It modifiy the passwordMatch state to "false" and show an error in the UI
                setPasswordMatch(false);
              }
            }}
          >
            <label
              htmlFor="groupName"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Nom de la Colocation:
              <input
                className="containerSign__mainSign__form__input"
                type="text"
                name="group_name"
                value={group_name}
                placeholder="Nom de la Colocation"
                onChange={(e) => {
                  // Dispatch the action to update the email value in the store
                  const action = changeSignupInputValue({
                    input: 'group_name',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            <label
              htmlFor="email"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Email :
              <input
                className="containerSign__mainSign__form__input"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  // Dispatch the action to update the email value in the store
                  const action = changeSignupInputValue({
                    input: 'email',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
              {/* Render email error message conditionally */}
              {emailError && (
                <p className="containerSign__main__form__error">{emailError}</p>
              )}
            </label>
            <label
              htmlFor="password"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Mot de passe:
              <input
                className="containerSign__mainSign__form__input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                placeholder="Mot de passe"
                onChange={(e) => {
                  // Dispatch the action to update the password value in the store
                  const action = changeSignupInputValue({
                    input: 'password',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
              <div className="containerSign__mainSign__form__input__toggle__eye">
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
              htmlFor="confirmPassword"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Confirmer le mot de passe:
              <input
                className="containerSign__mainSign__form__input"
                type="password"
                name="confirm_assword"
                value={confirm_password}
                placeholder="Confirmation de Mot de passe"
                onChange={(e) => {
                  // Dispatch the action to update the password value in the store
                  const action = changeSignupInputValue({
                    input: 'confirm_password',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            {/*  Display an error message if password and confirmPassword are differents (conditional rendering) */}
            {!passwordMatch && (
              <p className="containerSign__mainSign__form__error">
                Les mots de passe ne correspondent pas
              </p>
            )}

            {errorMessageEmptyInput && (
              <p className="containerSign__mainSign__form__error">
                {errorMessageEmptyInput}
              </p>
            )}
            <button
              type="submit"
              className="containerSign__mainSign__form__button"
            >
              Créer ta Coloc
            </button>
          </form>
          <NavLink to="/login" className="containerSign__mainSign__link">
            Vous possédez déjà un compte Coloc&Co? Cliquez-ici!
          </NavLink>
        </div>
      </div>
    </div>
  );
}
