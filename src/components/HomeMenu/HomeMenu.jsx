import './HomeMenu.scss';
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

export default function HomeMenu() {
  const [menuClose, setMenuClose] = useState(false);
  const [toggleReact, setToggleReact] = useState(true);
  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };
  const toggleToggle = () => {
    setToggleReact(!toggleReact);
  };

  return (
    <div className={`homeMenu ${menuClose ? 'homeMenu--close' : ''}`}>
      <div
        className="homeMenu__menuBurger"
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
      <div className="homeMenu__profile">
        <NavLink to="/profile" className="homeMenu__profile__avatar">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        </NavLink>
        <h3 className="homeMenu__profile__user">UserName</h3>
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

      <div className="homeMenu__profileUser">
        <NavLink to="/profile/:user" className="homeMenu__profileUser__single">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        </NavLink>
        <h4 className="homeMenu__profile__user">UserNameOther</h4>
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
        <NavLink to="/profile/:user" className="homeMenu__profileUser__single">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        </NavLink>
        <h4 className="homeMenu__profile__user">UserNameOther</h4>
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
        <NavLink to="/profile/:user" className="homeMenu__profileUser__single">
          <FontAwesomeIcon icon={faCircleUser} size="2xl" />
        </NavLink>
        <h4 className="homeMenu__profile__user">UserNameOther</h4>
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
      <div
        className={`homeMenu__footer ${
          menuClose ? 'homeMenu__footer--close' : ''
        }`}
      >
        <NavLink to="/rules">Réglement Intérieur</NavLink>
      </div>
    </div>
  );
}
