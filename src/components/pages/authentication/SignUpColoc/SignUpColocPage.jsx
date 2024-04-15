import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import { changeSignupInputValue } from '../../../../store/userSlice';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import './SignUpColocPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { handleSuccessfullSignUpColoc } from '../../../../store/userSlice';

export default function SignUpColocPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Import email, password, groupName from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const groupname = useSelector((state) => state.user.groupname);
  const confirmpassword = useSelector((state) => state.user.confirmpassword);
  const createdColocation = useSelector(
    (state) => state.user.createdColocation
  );

  // add a useState to verify if password and confirmPassword match
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (createdColocation) {
      console.log('Redirecting to /create-profile');
      navigate('/create-profile');
    }
  }, [createdColocation]);
  {
    /*}
  useEffect(() => {
    // Reset the error message when the user types in the confirmPassword field
    setPasswordMatch(true);
  }, [confirmpassword]);
*/
  }

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
          <h2 className="containerSign__title">
            Créer une nouvelle Colocation
          </h2>
        </div>
        <form
          className="containerSign__form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission
            console.log('envoyer signup');
            // Check if the password matches the confirmPassword
            if (password === confirmpassword) {
              console.log('submit ok : création ok');
              dispatch({ type: 'CREATE_GROUP' });
              /* // Après la création, vérifiez si createdColocation est true et redirigez si nécessaire
              if (createdColocation) {
                console.log('Redirecting to /create-profile');
                navigate('/create-profile'); 
              }*/
            } else {
              console.log('submit pas ok : groupe non créer');
              // afficher un message d'erreur
              // if the paswword doesn't match with the confirmPassword
              // It modifiy the passwordMatch state to "false" and show an error in the UI
              setPasswordMatch(false);
            }
          }}
        >
          <label htmlFor="groupname" className="containerSign__form__label">
            {' '}
            Nom de la Colocation:
            <input
              className="containerSign__form__input"
              type="text"
              name="groupname"
              value={groupname}
              placeholder="Nom de la Colocation"
              onChange={(e) => {
                // Dispatch the action to update the email value in the store
                const action = changeSignupInputValue({
                  input: 'groupname',
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
                const action = changeSignupInputValue({
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
                const action = changeSignupInputValue({
                  input: 'confirmpassword',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
            {/*  Display an error message if password and confirmPassword are differents (conditional rendering) */}
            {passwordMatch || (
              <p className="containerSign__form__error">
                Le mot de passe ne correspondent pas
              </p>
            )}
            {/* Show the error message if there is any */}
          </label>

          <button type="submit" className="containerSign__form__button">
            Créer une nouvelle Colocation
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
