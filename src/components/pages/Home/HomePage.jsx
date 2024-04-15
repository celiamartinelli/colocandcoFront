import './HomePage.scss';
import { NavLink } from 'react-router-dom';
import Header from '../../Header/Header';
import HomeMenu from '../../HomeMenu/HomeMenu';
import Footer from '../../Footer/Footer';

export default function HomePage() {
  return (
    <div className="container">
      <div className="container__nav">
        <HomeMenu />
      </div>
      <div className="container__content">
        <div className="container__content__header">
          <Header />
        </div>
        <div className="container__content__title">
          <h1>La Coloc qui Déchire</h1>
        </div>
        <div className="container__content__main">
          <NavLink to="/events" className="container__content__main__link">
            Calendrier
          </NavLink>
          <NavLink
            to="/shopping-list"
            className="container__content__main__link"
          >
            Liste Commune
          </NavLink>
          <NavLink to="/messaging" className="container__content__main__link">
            Messagerie
          </NavLink>
          <NavLink to="/vote" className="container__content__main__link">
            Sondage
          </NavLink>
          <NavLink to="/expenses" className="container__content__main__link">
            Gestion des Dépenses
          </NavLink>
          <NavLink to="/tasks" className="container__content__main__link">
            Tâches Ménagère
          </NavLink>
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
