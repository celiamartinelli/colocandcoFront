import './FeatureMenu.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faToggleOn,
  faToggleOff,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function FeatureMenu() {
  const [menuClose, setMenuClose] = useState(false);
  const [toggleReact, setToggleReact] = useState(true);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };
  const toggleToggle = () => {
    setToggleReact(!toggleReact);
  };

  return (
    <div className={`Menu ${menuClose ? 'Menu--close' : ''}`}>
      <div
        className="Menu__menuBurger"
        role="button"
        tabIndex={0}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
      >
        {menuClose ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faTimes} />
        )}
      </div>
      <div
        className={`Menu__profile ${toggleReact ? 'Menu__profile--off' : ''}`}
      >
        <NavLink to="/profile" className="Menu__profile__avatar">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        </NavLink>
        <div
          className="Menu__profile__toggle"
          role="button"
          tabIndex={0}
          onClick={toggleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleToggle();
            }
          }}
        >
          {toggleReact ? (
            <FontAwesomeIcon icon={faToggleOn} size="2xl" />
          ) : (
            <FontAwesomeIcon icon={faToggleOff} size="2xl" />
          )}
        </div>
      </div>
      <div className="Menu__feature">
        <NavLink to="/" className="Menu__feature__single">
          Accueil
        </NavLink>
        <NavLink to="/events" className="Menu__feature__single">
          Calendrier
        </NavLink>
        <NavLink to="/shopping-list" className="Menu__feature__single">
          Liste Commune
        </NavLink>
        <NavLink to="/messaging" className="Menu__feature__single">
          Messagerie
        </NavLink>
        <NavLink to="/vote" className="Menu__feature__single">
          Sondage
        </NavLink>
        <NavLink to="/expenses" className="Menu__feature__single">
          Dépenses
        </NavLink>
        <NavLink to="/tasks" className="Menu__feature__single">
          Tâches Ménagère
        </NavLink>
      </div>
    </div>
  );
}
