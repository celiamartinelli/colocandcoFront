import './Footer.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

export default function Footer() {
  return (
    <div className="question">
      <NavLink to="/faq">
        <FontAwesomeIcon icon={faCircleQuestion} bounce />
      </NavLink>
    </div>
  );
}
