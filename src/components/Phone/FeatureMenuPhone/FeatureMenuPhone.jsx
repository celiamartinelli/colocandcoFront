import './FeatureMenuPhone.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faTimes,
  faGear,
  faCircleQuestion,
  faBroom,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
// Icones to future features
// import {
//   faComments,
//   faCalendarDay,
//   faMoneyBill1Wave,
//   faCheckToSlot,
// } from '@fortawesome/free-solid-svg-icons';

export default function FeatureMenuPhone() {
  const [menuClose, setMenuClose] = useState(false);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };

  return (
    <div
      className={`FeatureMenuPhone ${
        menuClose ? 'FeatureMenuPhone--closed' : ''
      }`}
    >
      <div
        className="FeatureMenuPhone__menuBurger"
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

      <div className="FeatureMenuPhone__profileUser">
        <div className="FeatureMenuPhone__profileUser__singlePhone">
          <NavLink to="/tasks">
            <FontAwesomeIcon
              icon={faBroom}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink>
          <NavLink to="/shopping-list">
            <FontAwesomeIcon
              icon={faListCheck}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink>
          {/* <NavLink to="/vote">
            <FontAwesomeIcon
              icon={faCheckToSlot}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink>
          <NavLink to="/expenses">
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink>
          <NavLink to="/events">
            <FontAwesomeIcon
              icon={faCalendarDay}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink>
          <NavLink to="/messaging">
            <FontAwesomeIcon
              icon={faComments}
              size="lg"
              className="FeatureMenuPhone__profileUser__singlePhone__feature"
            />
          </NavLink> */}
        </div>
      </div>
      <div
        className={`FeatureMenuPhone__footer ${
          menuClose ? 'FeatureMenuPhone__footer--closed' : ''
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
