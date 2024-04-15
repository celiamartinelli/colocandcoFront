import './HomeMenuPhone.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faToggleOn,
  faToggleOff,
  faChevronUp,
  faTimes,
  faGear,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeMenu() {
  const dispatch = useDispatch();
  const [menuClose, setMenuClose] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_USERS' });
  }, []);

  const userData = useSelector((state) => state.user.userData);

  const users = useSelector((state) => state.user.users);

  const colocs = users.filter((user) => user.id !== userData.id);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };

  return (
    <div className={`homeMenuPhone ${menuClose ? 'homeMenuPhone--close' : ''}`}>
      <div
        className="homeMenuPhone__menuBurger"
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
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faTimes} />
        )}
      </div>

      {colocs.length ? (
        <div className="homeMenuPhone__profileUser">
          {colocs.map((coloc) => (
            <div key={coloc.id} className="homeMenuPhone__profileUser__single">
              <NavLink
                to={`/profile/${coloc.id}`}
                className="homeMenuPhone__profileUser__single__avatar"
              >
                {coloc.avatar_file ? (
                  <img
                    src={`http://localhost:3000/${coloc.avatar_file}`}
                    alt="Avatar"
                    className="homeMenuPhone__profileUser__single__file"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size="lg"
                    className="homeMenuPhone__profileUser__single__avatar"
                  />
                )}
              </NavLink>
              <h4 className="homeMenuPhone__profileUser__single__user">
                {coloc.firstname}
              </h4>
              <div className="homeMenuPhone__profileUser__single__toggle">
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
        <p>Aucun colocataire trouvé.</p>
      )}
      <div
        className={`homeMenuPhone__footer ${
          menuClose ? 'homeMenuPhone__footer--close' : ''
        }`}
      >
        <NavLink to="/settings">
          <FontAwesomeIcon icon={faGear} />
        </NavLink>
        <NavLink to="/rules">Réglement Intérieur</NavLink>
        <NavLink to="/faq">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </NavLink>
      </div>
    </div>
  );
}
