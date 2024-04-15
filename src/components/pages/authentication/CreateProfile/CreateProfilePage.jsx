import { NavLink, useNavigate } from 'react-router-dom';
import './CreateProfilePage.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { changeProfileInputValue } from '../../../../store/userSlice';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';

export default function CreateProfilPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Import email, password, groupName from the store using useSelector
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
  const phone_number = useSelector((state) => state.user.phone_number);
  const birthdate = useSelector((state) => state.user.birthdate);

  const createdProfile = useSelector((state) => state.user.createdProfile);

  // Add a useState to manage the visibility of the error message when an input is empty
  const [errorMessageEmptyInput, setErrorMessageEmptyInput] = useState('');

  return (
    <div className="bobyCreateProfile">
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
              Créer mon Profil
            </h2>
          </div>
          <form
            className="containerSign__mainSign__form"
            onSubmit={(e) => {
              e.preventDefault();
              // Check if all required fields (firstname, lastname, phone_number, birthdate) are filled
              if (
                firstname.trim() &&
                lastname.trim() &&
                phone_number.trim() &&
                birthdate.trim()
              ) {
                // Dispatch the action to create the profile
                dispatch({ type: 'CREATE_PROFILE' });
                // Navigate to the desired location (e.g., homepage)
                navigate('/');
              } else {
                // If any of the required fields is empty, set an error message
                setErrorMessageEmptyInput(
                  'Veuillez renseigner tous les champs.'
                );
                // Exit the function to prevent further execution
                return;
              }
            }}
          >
            <label
              htmlFor="firstname"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Prénom:
              <input
                className="containerSign__mainSign__form__input"
                type="text"
                name="firstname"
                value={firstname}
                placeholder="Prénom"
                onChange={(e) => {
                  // Dispatch the action to update the email value in the store
                  const action = changeProfileInputValue({
                    input: 'firstname',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            <label
              htmlFor="lastname"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Nom:
              <input
                className="containerSign__mainSign__form__input"
                type="text"
                name="lastname"
                value={lastname}
                placeholder="Nom"
                onChange={(e) => {
                  // Dispatch the action to update the email value in the store
                  const action = changeProfileInputValue({
                    input: 'lastname',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            <label
              htmlFor="phoneNumber"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Numéro de Téléphone:
              <input
                className="containerSign__mainSign__form__input"
                type="tel"
                name="phone_number"
                value={phone_number}
                placeholder="00.00.00.00.00"
                onChange={(e) => {
                  // Dispatch the action to update the email value in the store
                  const action = changeProfileInputValue({
                    input: 'phone_number',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            <label
              htmlFor="birthdate"
              className="containerSign__mainSign__form__label"
            >
              {' '}
              Date de Naissance:
              <input
                className="containerSign__mainSign__form__input"
                type="date"
                name="birthdate"
                value={birthdate}
                placeholder="00/00/0000"
                onChange={(e) => {
                  // Dispatch the action to update the password value in the store
                  // Check if the value is a valid date before dispatching the action
                  //  if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) {
                  const action = changeProfileInputValue({
                    input: 'birthdate',
                    value: e.target.value,
                  });
                  dispatch(action);
                }}
              />
            </label>
            {/* <label htmlFor="avatarFile" className="containerSign__form__label">
            {' '}
            Ajout avatar:
            <input
              className="containerSign__form__input"
              type="file"
              name="avatarFile"
              accept="image/*"
              onChange={(e) =>
                dispatch(
                  changeProfileInputValue({
                    input: 'avatarFile',
                    value: { file: e.target.files[0], path: 'path/to/file' },
                  })
                )
              }
            />
          </label> */}
            {errorMessageEmptyInput && (
              <p className="containerSign__mainSign__form__error">
                {errorMessageEmptyInput}
              </p>
            )}
            <button
              type="submit"
              className="containerSign__mainSign__form__button"
            >
              Créer mon profil
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
