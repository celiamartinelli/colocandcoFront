import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal() {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="containerModal">
      {modal && (
        <div className="containerModal__modal">
          <div
            onClick={toggleModal}
            className="containerModal__modal__overlay"
            // Add role="button" to indicate that this element serves as a button for accessibility
            role="button"
            // Set tabIndex={0} to make the overlay focusable when navigating using the keyboard
            // This is essential for users who rely on keyboard navigation for accessibility.
            tabIndex={0}
            // Add onKeyDown event handler to respond to keyboard events, specifically 'Enter' key press
            // When 'Enter' is pressed, trigger the toggleModal function to close the modal
            onKeyDown={(e) => e.key === 'Enter' && toggleModal()}
          >
            {' '}
          </div>
          <div className="containerModal__modal__content">
            <h2>Votre inscription est bien validée</h2>
            <p>Vous pouvez désormais vous connecter</p>
            <button
              type="button"
              className="containerModal__modal__content__close"
              onClick={toggleModal}
              aria-label="Fermer la fenêtre modale"
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
