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
import { useSelector, useDispatch } from 'react-redux';
import { toggleAvailableProfile } from '../../store/userSlice';

export default function FeatureMenu() {
  const dispatch = useDispatch();
  const [menuClose, setMenuClose] = useState(false);
  // const [toggleReact, setToggleReact] = useState(true);

  const userData = useSelector((state) => state.user.userData);
  //  const firstname = useSelector((state) => state.user.firstname);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };
  // const toggleToggle = () => {
  //   setToggleReact(!toggleReact);
  // };

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
      <div className={`Menu__profile ${menuClose ? 'Menu__profile--off' : ''}`}>
        <NavLink to="/profile" className="Menu__profile__avatar">
          {userData.avatar_file ? (
            <img
              src={`http://localhost:3000/${userData.avatar_file}`}
              alt="Avatar"
              className="Menu__profile__file"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2xl"
              className="Menu__profile__avatar"
            />
          )}
        </NavLink>
        <h3 className="homeMenu__profile__user">
          {userData.firstname ? `${userData.firstname}` : 'Bienvenue'}
        </h3>
        <div
          className="Menu__profile__toggle"
          role="button"
          tabIndex={0}
          onClick={() => {
            const action = toggleAvailableProfile(userData.available);
            console.log('action HOME MENU', action);
            dispatch(action);
            dispatch({ type: 'PATCH_USER_INFORMATIONS' });
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const action = toggleAvailableProfile(userData.available);
              console.log('action HOME MENU', action);
              dispatch(action);
              dispatch({ type: 'PATCH_USER_INFORMATIONS' });
            }
          }}
        >
          {userData.available ? (
            <FontAwesomeIcon icon={faToggleOn} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faToggleOff} size="xl" />
          )}
        </div>
      </div>
      <div className="Menu__feature">
        <NavLink to="/" className="Menu__feature__single">
          Accueil
        </NavLink>
        <NavLink to="/tasks" className="Menu__feature__single">
          Tâches Ménagères
        </NavLink>
        <NavLink to="/shopping-list" className="Menu__feature__single">
          Liste Commune
        </NavLink>
        {/* <NavLink to="/events" className="Menu__feature__single">
          Calendrier
        </NavLink>
      
        <NavLink to="/messaging" className="Menu__feature__single">
          Messagerie
        </NavLink>
        <NavLink to="/vote" className="Menu__feature__single">
          Sondage
        </NavLink>
        <NavLink to="/expenses" className="Menu__feature__single">
          Dépenses
        </NavLink> */}
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
