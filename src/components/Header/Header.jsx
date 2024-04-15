import './Header.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { toggleLogout } from '../../store/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logged = useSelector((state) => state.user.logged);
  // console.log('Logged status:', logged);
  // Add local state to track whether the pop-up should be shown or not
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      <div className="header">
        <NavLink to="/" className="header__home">
          Coloc&co
        </NavLink>
        <NavLink to="/settings">
          <FontAwesomeIcon icon={faGear} />
        </NavLink>

        {logged ? (
          <div className="header__logout">
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
