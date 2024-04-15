import './HomeMenu.scss';
import { useEffect, useState } from 'react';
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

export default function HomeMenu() {
  const dispatch = useDispatch();
  const [menuClose, setMenuClose] = useState(false);

  useEffect(() => {
    // Get all roommates when loading the component
    dispatch({ type: 'GET_ALL_USERS' });
  }, [dispatch]);

  const userData = useSelector((state) => state.user.userData);

  const users = useSelector((state) => state.user.users);

  const colocs = users.filter((user) => user.id !== userData.id);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
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
      <div
        className={`homeMenu__profile ${
          menuClose ? 'homeMenu__profile--close' : ''
        }`}
      >
        <NavLink to="/profile" className="homeMenu__profile__avatar">
          {userData.avatar_file ? (
            <img
              src={`http://localhost:3000/${userData.avatar_file}`}
              alt="Avatar"
              className="homeMenu__profile__file"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              size="xl"
              className="homeMenu__profile__avatar"
            />
          )}
        </NavLink>
        <h3 className="homeMenu__profile__user">
          {userData.firstname ? `${userData.firstname}` : 'Bienvenue'}
        </h3>
        <div
          className="homeMenu__profile__toggle"
          role="button"
          tabIndex={0}
          onClick={() => {
            const action = toggleAvailableProfile(userData.available);
            dispatch(action);
            dispatch({ type: 'PATCH_USER_INFORMATIONS' });
          }}
          onKeyDown={(e) => {
            // Fire click event when user presses Enter key
            if (e.key === 'Enter') {
              const action = toggleAvailableProfile(userData.available);
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

      {colocs.length ? (
        <div className="homeMenu__profileUser">
          {colocs.map((coloc) => (
            <div key={coloc.id} className="homeMenu__profileUser__single">
              <NavLink
                to={`/profile/${coloc.id}`}
                className="homeMenu__profileUser__single__avatar"
              >
                {coloc.avatar_file ? (
                  <img
                    src={`http://localhost:3000/${coloc.avatar_file}`}
                    alt="Avatar"
                    className="homeMenu__profileUser__single__file"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size="lg"
                    className="homeMenu__profileUser__single__avatar"
                  />
                )}
              </NavLink>
              <h4 className="homeMenu__profileUser__single__user">
                {coloc.firstname}
              </h4>
              <div className="homeMenu__profileUser__single__toggle">
                {coloc.available ? (
                  <FontAwesomeIcon icon={faToggleOn} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faToggleOff} size="lg" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p> </p>
      )}
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
