import { NavLink } from 'react-router-dom';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import './WelcomePage.scss';

export default function WelcomePage() {
  return (
    <div>
      <div className="headerSign">
        <HeaderSign />
      </div>
      <div className="containerSign">
        <HeaderSignTitle />
        <div className="containerSign__main">
          <div className="containerSign__main__header">
            <h2 className="containerSign__main__title">Inscription</h2>
            <div className="containerSign__main__main">
              <NavLink
                to="/login"
                className="containerSign__main__main__button"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/signup"
                className="containerSign__main__main__button"
              >
                Inscription
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
