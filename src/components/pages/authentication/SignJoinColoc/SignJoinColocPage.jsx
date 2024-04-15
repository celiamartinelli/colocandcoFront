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
  changeLoginInputValue,
  setError,
} from '../../../../store/userSlice';

export default function SignJoinColocPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Import codeColoc , email , password , confirmPassword from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const code_coloc = useSelector((state) => state.user.code_coloc);
  const password = useSelector((state) => state.user.password);
  const confirm_password = useSelector((state) => state.user.confirm_password);
  const error = useSelector((state) => state.user.error);
  const joinedColocation = useSelector((state) => state.user.joinedColocation);

  // add a useState to verify if password and confirmPassword match
  const [passwordMatch, setPasswordMatch] = useState(true);
  // add a useState to show/hide the password/confirmaPassword when the eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // add a useState to store the email error state
  const [emailError, setEmailError] = useState('');

  // Add a useState to manage the visibility of the error message when an input is empty
  const [errorMessageEmptyInput, setErrorMessageEmptyInput] = useState('');

  useEffect(() => {
    // When changing pages, reset all input values to their initial state
    return () => {
      dispatch(changeSignJoinColocInputValue({ input: 'email', value: '' }));
      dispatch(
        changeSignJoinColocInputValue({ input: 'code_coloc', value: '' })
      );
      dispatch(
        changeSignJoinColocInputValue({ input: 'confirm_password', value: '' })
      );
      dispatch(changeSignJoinColocInputValue({ input: 'password', value: '' }));

      // Reset errors states
      setEmailError('');
      setErrorMessageEmptyInput('');

      dispatch(setError());
    };
  }, []);

  useEffect(() => {
    // Reset the error message when the user types in the confirmPassword field
    setPasswordMatch(true);
  }, [confirm_password]);

  useEffect(() => {
    if (joinedColocation) {
      dispatch(changeLoginInputValue({ input: 'email', value: '' }));
      dispatch(changeLoginInputValue({ input: 'password', value: '' }));
      //  console.log('Redirecting to /login');
      navigate('/login');
    }
  }, [joinedColocation]);

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
              Rejoindre une Colocation
            </h2>
          </div>

          <form
            className="containerSign__mainSign__form"
            onSubmit={(e) => {
              e.preventDefault();

              setEmailError('');
              setErrorMessageEmptyInput('');

              // Check if all fields are filled
              if (!code_coloc || !email || !password || !confirm_password) {
                // Set the error message
                setErrorMessageEmptyInput(
                  'Veuillez renseigner tous les champs.'
                );
                return;
              }

              // Check if the email has a valid format using a regex
              if (!emailRegex.test(email)) {
                // Set the email error state
                setEmailError("L'e-mail n'est pas au bon format");
                return;
              }

              // Check if the password matches the confirmPassword
              if (password === confirm_password) {
                // console.log('submit ok : password = confirmPassword');
                dispatch({ type: 'JOIN_GROUP_AND_CREATE_USER' });
                // when the visitor submit to signup, dispatch of the action joinColocationSuccess to the userSlice
                // dispatch(joinColocationSuccess());
                // redirect the new user to login page to connect
              } else {
                // console.log(
                //   'submit pas ok : password  ne correspond pas à confirmPassword'
                // );
                // show mesage error
                // if the password doesn't match with the confirmPassword
                // It modifiy the passwordMatch state to "false" and show an error in the UI
                setPasswordMatch(false);
              }
            }}
          >
            <label
              htmlFor="codeColoc"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Code de la Colocation:
              <input
                className="containerSign__mainSign__form__input"
                type="text"
                name="code_coloc"
                value={code_coloc}
                placeholder="Code Colocation"
                onChange={(e) => {
                  // Dispatch the action to update the codeColoc value in the store
                  const action = changeSignJoinColocInputValue({
                    input: 'code_coloc',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
              {/* Show the error message if code coloc is false */}
              {error && code_coloc && (
                <p className="containerSign__main__form__error">{error}</p>
              )}
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
                  const action = changeSignJoinColocInputValue({
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
                  const action = changeSignJoinColocInputValue({
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
                name="confirm_password"
                value={confirm_password}
                placeholder="Confirmation de Mot de passe"
                onChange={(e) => {
                  // Dispatch the action to update the password value in the store
                  const action = changeSignJoinColocInputValue({
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
              Rejoins la Coloc
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
