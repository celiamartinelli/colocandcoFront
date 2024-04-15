import { NavLink } from 'react-router-dom';
import './CreateProfilePage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfileInputValue } from '../../../../store/userSlice';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CreateProfilPage() {
  const dispatch = useDispatch();

  // Import email, password, groupName from the store using useSelector
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const birthDate = useSelector((state) => state.user.birthDate);

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
          <h2 className="containerSign__title">Créer mon Profil</h2>
        </div>
        <form
          className="containerSign__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'CREATE_PROFILE' });
          }}
        >
          <label htmlFor="firstName" className="containerSign__form__label">
            {' '}
            Prénom:
            <input
              className="containerSign__form__input"
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Prénom"
              onChange={(e) => {
                // Dispatch the action to update the email value in the store
                const action = changeProfileInputValue({
                  input: 'firstName',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>
          <label htmlFor="lastName" className="containerSign__form__label">
            {' '}
            Nom:
            <input
              className="containerSign__form__input"
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Nom"
              onChange={(e) => {
                // Dispatch the action to update the email value in the store
                const action = changeProfileInputValue({
                  input: 'lastName',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>
          <label htmlFor="phoneNumber" className="containerSign__form__label">
            {' '}
            Numéro de Téléphone:
            <input
              className="containerSign__form__input"
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="00.00.00.00.00"
              onChange={(e) => {
                // Dispatch the action to update the email value in the store
                const action = changeProfileInputValue({
                  input: 'phoneNumber',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>
          <label htmlFor="birthDate" className="containerSign__form__label">
            {' '}
            Date de Naissance:
            <input
              className="containerSign__form__input"
              type="date"
              name="birthDate"
              value={birthDate}
              placeholder="00/00/0000"
              onChange={(e) => {
                // Dispatch the action to update the password value in the store
                const action = changeProfileInputValue({
                  input: 'birthDate',
                  value: e.target.value,
                });
                dispatch(action);
              }}
            />
          </label>
          <label htmlFor="avatarFile" className="containerSign__form__label">
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
          </label>
          <button type="submit" className="containerSign__form__button">
            Créer mon profil
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
