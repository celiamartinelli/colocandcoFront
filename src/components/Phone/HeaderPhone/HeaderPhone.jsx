import './HeaderPhone.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPowerOff,
  faCircleUser,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { toggleLogout, toggleAvailableProfile } from '../../../store/userSlice';

export default function HeaderPhone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logged = useSelector((state) => state.user.logged);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    if (showConfirmation) {
      dispatch(toggleLogout());
      setShowConfirmation(false);
      navigate('/login');
    } else {
      setShowConfirmation(true);
    }
  };
  return (
    <div>
      <div className="headerPhone">
        <div className="headerPhone__user">
          {' '}
          <NavLink to="/profile">
            {userData.avatar_file ? (
              <img
                src={`http://localhost:3000/${userData.avatar_file}`}
                alt="Avatar"
                className="headerPhone__user__file"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                size="lg"
                className="headerPhone__user__avatar"
              />
            )}
          </NavLink>
          <h3 className="headerPhone__user__name">
            {userData.firstname ? `${userData.firstname}` : 'Bienvenue'}
          </h3>
          <div
            className="headerPhone__user__toggle"
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
              <FontAwesomeIcon
                icon={faToggleOn}
                size="xl"
                style={{ color: '#4fd166' }}
              />
            ) : (
              <FontAwesomeIcon icon={faToggleOff} size="xl" />
            )}
          </div>
        </div>
        <div className="headerPhone__logo">
          <NavLink to="/" className="header__logo">
            Coloc&co
          </NavLink>
        </div>

        {logged ? (
          <div className="headerPhone__logout">
            <FontAwesomeIcon
              icon={faPowerOff}
              role="button"
              className="button__logout"
              onClick={handleLogout}
            />
            {showConfirmation && (
              <div className="logout__confirmation">
                <p>Voulez-vous vraiment vous déconnecter ?</p>
                <button type="button" onClick={handleLogout}>
                  Oui
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Logout</p>
        )}
      </div>
    </div>
  );
}
