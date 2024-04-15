import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import './SignUpPage.scss';

export default function SignUpPage() {
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
            <h2 className="containerSign__main__title">Inscription</h2>
            <div className="containerSign__main__main">
              <NavLink
                to="/signup-coloc"
                className="containerSign__main__main__button"
              >
                Créer une nouvelle Coloc
              </NavLink>
              <NavLink
                to="/join-coloc"
                className="containerSign__main__main__button"
              >
                Rejoindre une Colocation
              </NavLink>
              <NavLink to="/login" className="containerSign__main__main__link">
                Vous possédez déjà un compte Coloc&Co? Cliquez-ici!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
